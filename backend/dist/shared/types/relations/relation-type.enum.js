"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBidirectional = exports.OppositeRelationType = exports.RelationType = void 0;
var RelationType;
(function (RelationType) {
    RelationType["WorksWith"] = "WORKS_WITH";
    RelationType["StudiedWith"] = "STUDIED_WITH";
    RelationType["Teammates"] = "Teammates";
    RelationType["Supervised"] = "SUPERVISED";
    RelationType["SubordinateTo"] = "SUBORDINATE_TO";
})(RelationType = exports.RelationType || (exports.RelationType = {}));
exports.OppositeRelationType = Object.freeze({
    [RelationType.WorksWith]: RelationType.WorksWith,
    [RelationType.StudiedWith]: RelationType.StudiedWith,
    [RelationType.Teammates]: RelationType.Teammates,
    [RelationType.Supervised]: RelationType.SubordinateTo,
    [RelationType.SubordinateTo]: RelationType.Supervised,
});
const isBidirectional = (type) => exports.OppositeRelationType[type] === type;
exports.isBidirectional = isBidirectional;
//# sourceMappingURL=relation-type.enum.js.map