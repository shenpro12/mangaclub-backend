export const getPages = (maxPage: number, currPage: number) => {
  let pages: Array<number> = [];
  for (let i = currPage - 2; i <= currPage + 2 && i <= maxPage; i++) {
    if (i > 0) {
      pages.push(i);
    }
  }
  return pages;
};
