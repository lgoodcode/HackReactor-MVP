import db from '@/database'

export const getWishlist = async (userId: string) => {
  const { rows } = await db.query<WishlistGame>(`SELECT * FROM wishlist WHERE user_id = $1`, [
    userId,
  ])
  return rows
}

/**
 * Add a game to a user's wishlist and returns the game if successful.
 */
export const addToWishlist = async (userId: string, gameId: string) => {
  const { rows } = await db.query<WishlistGame>(
    `INSERT INTO wishlist (user_id, game_id) VALUES ($1, $2) RETURNING *`,
    [userId, gameId]
  )
  return rows[0]
}

/**
 * Remove a game from a user's wishlist and returns the game if successful.
 */
export const removeFromWishlist = async (userId: string, gameId: string) => {
  const { rows } = await db.query<WishlistGame>(
    `DELETE FROM wishlist WHERE user_id = $1 AND game_id = $2 RETURNING *`,
    [userId, gameId]
  )
  return rows[0]
}
