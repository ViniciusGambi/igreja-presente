export function alphabeticSort(values: any[], orderType: any) {
  return values.sort((a, b) => {
    if (a[orderType] < b[orderType]) {
      return -1;
    }

    if (a[orderType] > b[orderType]) {
      return 1;
    }

    return 0;
  });
}
