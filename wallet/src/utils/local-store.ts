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

function determineType(value: unknown) {
  switch (true) {
    case typeof value === 'string':
      return 'String'
    case typeof value === 'number':
      return 'Number'
    case typeof value === 'boolean':
      return 'Boolean'
    case Array.isArray(value):
      return 'Array'
    case value !== null && typeof value === 'object' && value.constructor === Object:
      return 'Object'
    default:
      return 'Unknown'
  }
}

export function setValue(key: string, value: unknown) {
  const current = localStorage.getItem(key)

  const type = determineType(value)

  if (type === 'Object' && value) {
    try {
      const data = current ? JSON.parse(current) : ({} as Record<string, unknown>)
      Object.entries(value).forEach(([key, value]) => {
        data[key] = value
      })
      value = { ...value, ...data }
    } catch {
      /** */
    }
  }

  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('storage'))
}

export const localStore = { set: setValue, get: getValue }

export function useLocalStore<T>(
  key: string
): [T | null, (value: string | number | boolean | Record<string, unknown> | unknown[]) => void] {
  const value = useSyncExternalStore(subscribe, getValue.bind(null, key)) as string

  function set(value: string | number | boolean | Record<string, unknown> | unknown[]) {
    setValue(key, value)
  }

  try {
    return [JSON.parse(value), set] as const
  } catch {
    return [null, set]
  }
}
