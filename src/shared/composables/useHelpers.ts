const useHelpers = () => {
  const fetchData = (key: string) => {
    const data = JSON.parse(localStorage.getItem(key) || '{}')
    if (!Object.keys(data).length) return null
    return data
  }

  const existingData = (key: string) => {
    const data = fetchData(key)
    return data
  }

  const deleteItem = (key: string) => {
    return localStorage.removeItem(key)
  }

  const delay = (
    amount = 800,
    msg: boolean | string = false,
  ): Promise<void> => {
    if (msg) {
      console.log(msg)
    }
    return new Promise((resolve) => setTimeout(resolve, amount))
  }

  const generateRandomColor = () => {
    const o = Math.round,
      r = Math.random,
      s = 255
    return (
      'rgba(' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      0.9 +
      ')'
    )
  }

  const localCurrency = (data: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(data)
  }

  const timestampToDate = (date: number) =>
    new Date(date).toLocaleDateString('pt-BR')

  const lastColumnGrid = <T>(item: T[], index: number) => {
    return item.length % 2 !== 0 && index === item.length - 1 ? 12 : 6
  }
  return {
    fetchData,
    existingData,
    deleteItem,
    delay,
    generateRandomColor,
    localCurrency,
    timestampToDate,
    lastColumnGrid,
  }
}

export default useHelpers
