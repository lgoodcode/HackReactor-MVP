export declare global {
  export type User = {
    id: string
    email: string
    password: string
    library: string[]
    wishlist: string[]
  }
}

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string
      library: string[]
      wishlist: string[]
    } | null
  }
}
