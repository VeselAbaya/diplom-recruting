"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = void 0;
const pagination_interface_1 = require("../../../shared/types/pagination/pagination.interface");
class PaginationDto {
    constructor(items, limit, page, total) {
        this.items = items;
        this.limit = limit;
        this.page = page;
        this.total = total;
    }
}
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map