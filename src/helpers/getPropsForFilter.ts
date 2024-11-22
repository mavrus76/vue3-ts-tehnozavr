export const getPropsForFilter = (
  arr: {
    id: number
    title: string
    code: string
    availableValues: {
      value: string
      productsCount: number
    }[]
  }[],
  propName: string
) => {
  const arr2: { value: string; productsCount: number }[] = []
  arr.forEach((prop) => {
    if (prop.code === propName) {
      prop.availableValues.forEach((v) => {
        arr2.push(v)
      })
    }
  })

  return arr2
}
