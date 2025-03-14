const entityMap: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

function escapeHtml(string: string): string {
  return String(string).replace(/[&<>"'`=/]/g, s => entityMap[s])
}

/**
 * Checks if a string is valid JSON
 * @param str - The string to check
 * @returns boolean indicating if string is valid JSON
 */
function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Recursively sanitizes an object by escaping all string values
 * @param data - The data to sanitize
 * @returns Sanitized copy of the data
 */
export function sanitize<T>(data: T): T {
  if (typeof data === 'string') {
    // Don't sanitize if it's a valid JSON string
    if (isValidJSON(data)) {
      return data as T
    }
    return escapeHtml(data) as T
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitize(item)) as T
  }

  if (data !== null && typeof data === 'object') {
    return Object.entries(data as Record<string, unknown>).reduce((acc, [key, value]) => {
      ;(acc as Record<string, unknown>)[key] = sanitize(value)
      return acc
    }, {} as T)
  }

  return data
}
