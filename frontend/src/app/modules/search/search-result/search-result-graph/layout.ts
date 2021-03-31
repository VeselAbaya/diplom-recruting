import {
  D3Edge,
  D3ForceDirectedLayout,
  D3ForceDirectedSettings,
  D3Graph, D3Node,
  Graph,
  MergedNode,
  toD3Node
} from '@swimlane/ngx-graph';
import { forceCollide, forceLink, forceManyBody, forceSimulation } from 'd3-force';
import { Observable } from 'rxjs';

export const GRAPH = {
  NODE_SIZE: 60,
  NODES_DISTANCE: 250
};

// @ts-ignore
const getSiblingLinks = (links, sourceId: string, targetId: string) => {
  const siblings = [];
  for (const link of links) {
    if ((link.source.id === sourceId && link.target.id === targetId) ||
        (link.source.id === targetId && link.target.id === sourceId)) {
      siblings.push(link);
    }
  }
  return siblings;
};

// @ts-ignore
const arcPath = (d) => {
  let reversed = false;
  let from = d.source;
  let to = d.target;
  if (d.source.x > d.target.x) {
    from = d.target;
    to = d.source;
    reversed = true;
  }
  const dx = (to.x - from.x);
  const dy = (to.y - from.y);
  const dr = Math.sqrt(dx * dx + dy * dy);
  const unevenCorrection = (d.sameUneven ? 0 : 0.5);
  const arc = d.sameMiddleLink
    ? 0
    : (dr * d.maxSameHalf / (d.sameIndexCorrected - unevenCorrection)) / 1.75;

  d.sameLowerHalf = !!(reversed ? (d.sameArcDirection ? 0 : 1) : d.sameArcDirection);
  return {
    reversed,
    path: `M${from.x},${from.y}A${arc},${arc} 0 0,${d.sameLowerHalf ? 0 : 1} ${to.x},${to.y}`
  };
};

export class Layout extends D3ForceDirectedLayout {
  defaultSettings: D3ForceDirectedSettings = {
    force: forceSimulation().force('charge', forceManyBody().strength(-150))
                            .force('collide', forceCollide(GRAPH.NODE_SIZE / 4)),
    forceLink: forceLink<D3Node, D3Edge>()
      .id(node => node.id || '')
      .distance(() => GRAPH.NODES_DISTANCE)
  };

  run(graph: Graph): Observable<Graph> {
    this.inputGraph = graph;
    this.d3Graph = {
      nodes: [...this.inputGraph.nodes.map(n => {
        const prevNodes = this.outputGraph?.nodes || [];
        const prevNodeWithSameId = prevNodes.find(prevNode => prevNode.id === n.id);
        if (prevNodeWithSameId?.position) {
          const {x, y} = prevNodeWithSameId.position;
          return {
            ...n,
            position: { x, y },
            x, y
          };
        }
        return {...n};
      })] as D3Node[],
      edges: [...this.inputGraph.edges.map(e => ({ ...e }))] as D3Edge[]
    };
    this.outputGraph = {
      nodes: [],
      edges: [],
      edgeLabels: []
    };
    this.outputGraph$.next(this.outputGraph);
    this.settings = Object.assign({}, this.defaultSettings, this.settings);
    if (this.settings.force) {
      this.settings.force
        .nodes(this.d3Graph.nodes)
        .force('link', this.settings.forceLink.links(this.d3Graph.edges))
        .alpha(0.5)
        .restart()
        .on('tick', () => {
          this.outputGraph$.next(this.d3GraphToOutputGraph(this.d3Graph));
        });
    }

    return this.outputGraph$.asObservable();
  }

  d3GraphToOutputGraph(d3Graph: D3Graph): Graph {
    // @ts-ignore
    this.outputGraph.nodes = this.d3Graph.nodes.map((node: MergedNode) => ({
      ...node,
      id: node.id,
      position: {
        x: node.x,
        y: node.y
      },
      dimension: {
        width: GRAPH.NODE_SIZE,
        height: GRAPH.NODE_SIZE
      },
      transform: `translate(${node.x - (GRAPH.NODE_SIZE) / 2 || 0}, ${node.y - (GRAPH.NODE_SIZE) / 2 || 0})`
    }));

    this.d3Graph.edges.forEach(edge =>  {
      // @ts-ignore
      const sameAll = getSiblingLinks(this.d3Graph.edges, edge.source.id, edge.target.id);

      sameAll.forEach((s, i) => {
        s.sameIndex = (i + 1);
        s.sameTotal = sameAll.length;
        s.sameTotalHalf = (s.sameTotal / 2);
        s.sameUneven = ((s.sameTotal % 2) !== 0);
        s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
        s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
        // @ts-ignore
        s.sameArcDirection = s.source.id === edge.source.id
          ? s.sameLowerHalf ? 0 : 1
          : s.sameLowerHalf ? 1 : 0;
        s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
        s.isFromLeftToRight = s.source.x < s.target.x;
      });
    });

    // tslint:disable-next-line:no-any
    const maxSame = this.d3Graph.edges.reduce((max, edge: any) => {
      return edge.sameTotal > max ? edge.sameTotal : max;
    }, 0);

    // tslint:disable-next-line:no-any
    this.d3Graph.edges.forEach((edge: any) => {
      edge.maxSameHalf = Math.ceil(maxSame / 3);
    });

    // tslint:disable-next-line:no-any
    this.outputGraph.edges = this.d3Graph.edges.map((edge: any, i, edges) => {
      const source = toD3Node(edge.source);
      const target = toD3Node(edge.target);
      const arcData = arcPath(edge);
      return {
        ...edge,
        source: source.id as string,
        target: target.id as string,
        line: arcData.path,
        reversed: arcData.reversed,
        refY: (edge.sameLowerHalf === edge.isFromLeftToRight ? 1 : -1) * edge.sameIndexCorrected * (edge.sameUneven ? 3.3 : 2),
        points: [
          { x: source.x, y: source.y },
          { x: target.x, y: target.y }
        ]
      };
    });

    this.outputGraph.edgeLabels = this.outputGraph.edges;
    return this.outputGraph;
  }
}
