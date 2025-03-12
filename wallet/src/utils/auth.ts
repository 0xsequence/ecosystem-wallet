interface AuthInfo {
  method: 'email' | 'google' | 'apple'
  email: string
}

export const getAuthInfo = (): AuthInfo | null => {
  const storedInfo = localStorage.getItem('authInfo')
  if (!storedInfo) {
    return null
  }
  try {
    return JSON.parse(storedInfo)
  } catch (e) {
    console.error('Failed to parse stored auth info:', e)
    return null
  }
}

export const saveAuthInfo = (method: 'email' | 'google' | 'apple', email: string | undefined) => {
  localStorage.setItem('authInfo', JSON.stringify({ method, email: email || '' }))
}
