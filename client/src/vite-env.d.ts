/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

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

  export type Session = {
    id: string
    library: LibraryGame[]
    wishlist: WishlistGame[]
  } | null

  export interface Ordering {
    id: number
    name: string
    unavailable: boolean
  }
}

// The following types are from the API
export declare global {
  export interface Game {
    id: number
    slug: string
    name: string
    released: Date
    tba: boolean
    background_image: string
    rating: number
    rating_top: number
    ratings: Rating[]
    ratings_count: number
    reviews_text_count: number
    added: number
    added_by_status: AddedByStatus
    metacritic: number
    playtime: number
    suggestions_count: number
    updated: Date
    user_game: null
    reviews_count: number
    saturated_color: string
    dominant_color: string
    platforms: PlatformElement[]
    parent_platforms: ParentPlatform[]
    genres: Genre[]
    stores: Store[]
    clip: null
    tags: Genre[]
    esrb_rating: EsrbRating
    short_screenshots: ShortScreenshot[]
  }

  export interface AddedByStatus {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }

  export interface EsrbRating {
    id: number
    name: string
    slug: string
  }

  export interface Genre {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
    domain?: string
    language?: Language
  }

  export enum Language {
    Eng = 'eng',
  }

  export interface ParentPlatform {
    platform: EsrbRating
  }

  export interface PlatformElement {
    platform: PlatformPlatform
    released_at: null
    requirements_en: RequirementsEn | null
    requirements_ru: null
  }

  export interface PlatformPlatform {
    id: number
    name: string
    slug: string
    image: null
    year_end: null
    year_start: number | null
    games_count: number
    image_background: string
  }

  export interface RequirementsEn {
    minimum: string
    recommended: string
  }

  export interface Rating {
    id: number
    title: string
    count: number
    percent: number
  }

  export interface ShortScreenshot {
    id: number
    image: string
  }

  export interface Store {
    id: number
    store: Genre
  }
}
