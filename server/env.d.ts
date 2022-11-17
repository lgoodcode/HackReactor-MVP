export declare global {
  export type User = {
    id: string
    email: string
    password: string
  }
}

declare module 'express-session' {
  interface SessionData {
    user_id: string | null
  }
}
