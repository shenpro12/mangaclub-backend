"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPages = void 0;
const getPages = (maxPage, currPage) => {
    let pages = [];
    for (let i = currPage - 2; i <= currPage + 2 && i <= maxPage; i++) {
        if (i > 0) {
            pages.push(i);
        }
    }
    return pages;
};
exports.getPages = getPages;
//# sourceMappingURL=getPages.js.map