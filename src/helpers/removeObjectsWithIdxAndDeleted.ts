export function removeObjectsWithIdxAndDeleteId<
  T extends { idx?: string | number; id?: string | number },
>(arr: T[]) {
  return arr.filter((obj: T) => {
    if (obj.idx) {
      return false;
    } else {
      if (obj?.id) {
        delete obj['id'];
      }
      return true;
    }
  });
}
