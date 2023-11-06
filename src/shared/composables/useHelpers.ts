import { z } from 'zod'

export const ErrorSchema = z.object({
  message: z.string(),
  status: z.string().or(z.number()).nullish(),
  code: z.string().or(z.number()).nullish(),
  stack: z.string().nullish(),
  name: z.string().nullish(),
  details: z.string().nullish(),
  hint: z.string().nullish(),
})

const useHelpers = () => {
  const fetchData = (key: string) => {
    const data = JSON.parse(localStorage.getItem(key) || '{}')
    if (!Object.keys(data).length) return null
    return data
  }

  const avatarInitials = (name: string) => {
    const names = name.trim().split(' ')
    const firstInitial = names[0][0]
    const seconstInitial = names[names.length - 1][0]
    const initials = `${firstInitial}${seconstInitial}`
    return initials
  }

  const setDefaultUsername = (name: string) => {
    const randomNumber = Math.floor(Math.random() * 1000)
    const names = name.trim().split(' ')
    const username = `${names[0]}_${names[names.length - 1]}${randomNumber}`
    return username.toLocaleLowerCase()
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

  const handleError = (err: unknown) => {
    const e = ErrorSchema.parse(err)
    console.log(e)
    return e.message
  }
  return {
    avatarInitials,
    delay,
    deleteItem,
    existingData,
    fetchData,
    generateRandomColor,
    handleError,
    lastColumnGrid,
    localCurrency,
    setDefaultUsername,
    timestampToDate,
  }
}

export default useHelpers
