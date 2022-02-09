export enum RelationType {
  WorksWith = 'WORKS_WITH',
  StudiedWith = 'STUDIED_WITH',
  Teammates = 'Teammates',
  Supervised = 'SUPERVISED',
  SubordinateTo = 'SUBORDINATE_TO',
}

// This map object' purpose is to show user not only selected relation type (e.g. Supervised)
// but also opposite (e.g. SubordinateTo) 'cause it can be useful for user
export const OppositeRelationType = Object.freeze({
  [RelationType.WorksWith]: RelationType.WorksWith,
  [RelationType.StudiedWith]: RelationType.StudiedWith,
  [RelationType.Teammates]: RelationType.Teammates,

  [RelationType.Supervised]: RelationType.SubordinateTo,
  [RelationType.SubordinateTo]: RelationType.Supervised,
});

export const isBidirectional = (type: RelationType) => OppositeRelationType[type] === type;

