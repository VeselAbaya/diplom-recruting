import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodeHTMLId'
})
export class NodeHTMLIdPipe implements PipeTransform {
  transform(uuid: string): string {
    return `node-${uuid}`;
  }
}
