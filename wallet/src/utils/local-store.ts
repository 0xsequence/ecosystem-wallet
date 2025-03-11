import { useSyncExternalStore } from 'react'

export const getValue = (key: string): string | null => {
  return localStorage.getItem(key)
}

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('storage', callback)
  }
}

export function setValue(key: string, value: unknown) {
  const current = localStorage.getItem(key)
  let data = {} as Record<string, unknown>
  try {
    if (current) {
      data = JSON.parse(current)
    }
  } catch {
    /** */
  }

  const isObject = Object.entries(data)?.length > 0 ? true : false

  if (isObject && value) {
    Object.entries(value).forEach(([key, value]) => {
      data[key] = value
    })
    value = { ...value, ...data }
  }

  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('storage'))
}

export const localStore = { set: setValue, get: getValue }

export function useLocalStore<T>(
  key: string
): [T | null, (value: string | number | boolean | Record<string, unknown>) => void] {
  const value = useSyncExternalStore(subscribe, getValue.bind(null, key)) as string

  function set(value: string | number | boolean | Record<string, unknown>) {
    setValue(key, value)
  }

  try {
    return [JSON.parse(value), set] as const
  } catch {
    return [null, set]
  }
}
