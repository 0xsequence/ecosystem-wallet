// RFC 5322 compliant email regex
export const isValidEmail = (email: unknown): email is string => {
  if (typeof email !== 'string') {
    return false
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email) && email.length <= 254 // Max email length per RFC 5321
}
