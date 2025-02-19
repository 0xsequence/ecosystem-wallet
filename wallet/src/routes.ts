export const ROUTES = {
  AUTH: '/auth',
  HOME: '/',
  SEND: '/send',
  TRANSACTIONS: '/transactions',
  INVENTORY: '/inventory',
  DISCOVER: '/discover',
  MARKET: '/market',
  RECEIVE: '/receive'
} as const

type RouteValues<T> = T[keyof T]
type NestedRouteValues<T> = T extends object
  ? RouteValues<T> | { [K in keyof T]: NestedRouteValues<T[K]> }[keyof T]
  : never

export type AppRoute = NestedRouteValues<typeof ROUTES>

export type PublicRoutes = typeof ROUTES.AUTH
export type ProtectedRoutes = Exclude<AppRoute, PublicRoutes>

export const isPublicRoute = (route: string): route is PublicRoutes => {
  return route === ROUTES.AUTH
}
