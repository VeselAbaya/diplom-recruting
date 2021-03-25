export declare enum RelationType {
    WorksWith = "WORKS_WITH",
    StudiedWith = "STUDIED_WITH",
    Teammates = "Teammates",
    Supervised = "SUPERVISED",
    SubordinateTo = "SUBORDINATE_TO"
}
export declare const OppositeRelationType: Readonly<{
    WORKS_WITH: RelationType;
    STUDIED_WITH: RelationType;
    Teammates: RelationType;
    SUPERVISED: RelationType;
    SUBORDINATE_TO: RelationType;
}>;
export declare const isBidirectional: (type: RelationType) => boolean;
