"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaSort = void 0;
const mangaSort = (mangaList, fillter) => {
    if (fillter == 'alphabet') {
        return [...mangaList].sort((a, b) => {
            let a_charCode = a.name.toLowerCase().charCodeAt(0);
            let b_charCode = b.name.toLowerCase().charCodeAt(0);
            return a_charCode - b_charCode;
        });
    }
    if (fillter == 'latest' || !fillter) {
        return [...mangaList].sort((a, b) => {
            let a_lastChapter = a.chapters.reduce((acc, curr) => acc.order > curr.order ? acc : curr);
            let b_lastChapter = b.chapters.reduce((acc, curr) => acc.order > curr.order ? acc : curr);
            return (Date.parse(b_lastChapter.createdAt.toString()) -
                Date.parse(a_lastChapter.createdAt.toString()));
        });
    }
    if (fillter == 'rating') {
        return [...mangaList].sort((a, b) => {
            let a_point = a.ratings.reduce((total, curr) => total + curr.point, 0) /
                a.ratings.length;
            let b_point = b.ratings.reduce((total, curr) => total + curr.point, 0) /
                b.ratings.length;
            return b_point - a_point;
        });
    }
    if (fillter == 'views') {
        return [...mangaList].sort((a, b) => {
            return b.views - a.views;
        });
    }
    return [];
};
exports.mangaSort = mangaSort;
//# sourceMappingURL=sort.js.map