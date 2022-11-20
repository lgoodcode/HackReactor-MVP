export declare global {
  export type GameProgress = 'pending' | 'in progress' | 'completed'

  export type LibraryGame = {
    id: number
    user_id: number
    game_id: number
    progress: GameProgress
    created_at: string
    updated_at: string
  }

  export type WishlistGame = {
    id: number
    user_id: number
    game_id: number
    created_at: string
    updated_at: string
  }

  export type User = {
    id: string
    email: string
    password: string
    created_at: string
    updated_at: string
  }
}

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string
      library: LibraryGame[]
      wishlist: WishlistGame[]
    } | null
  }
}
