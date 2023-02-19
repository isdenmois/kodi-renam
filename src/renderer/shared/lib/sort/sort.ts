export const sortBy = <T>(array: T[], key: keyof T): T[] =>
  array.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }

    return 0
  })
