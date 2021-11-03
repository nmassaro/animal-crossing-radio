import { useEffect, useState } from "react"

export const useLocalStorage = (key: string, defaultValue?: string): [string, (value: any) => void] => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setValue(window.localStorage.getItem(key) || defaultValue)
    }
  }, [typeof window])

  const updateLocalStorage = (value) => {
    window.localStorage.setItem(key, value)
    setValue(value)
  }

  return [value, updateLocalStorage]
}