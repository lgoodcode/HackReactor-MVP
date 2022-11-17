export declare global {
  // Globally declare the types to reduce repetition
  import type { Request, Response, NextFunction } from 'express'
  export { Request, Response, NextFunction }

  export type User = {
    id: string
    email: string
    password: string
  }
}
