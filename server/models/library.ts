import db from '@/database'

export const getLibrary = async (userId: string) => {
  const { rows } = await db.query<LibraryGame>(`SELECT * FROM library WHERE user_id = $1`, [userId])
  return rows
}

/**
 * Add a game to a user's library and returns the game if successful.
 */
export const addToLibrary = async (userId: string, gameId: string) => {
  const { rows } = await db.query<LibraryGame>(
    `INSERT INTO library (user_id, game_id) VALUES ($1, $2) RETURNING *`,
    [userId, gameId]
  )
  return rows[0]
}

/**
 * Remove a game from a user's library and returns the game if successful.
 */
export const removeFromLibrary = async (userId: string, gameId: string) => {
  const { rows } = await db.query<WishlistGame>(
    `DELETE FROM library WHERE user_id = $1 AND game_id = $2 RETURNING *`,
    [userId, gameId]
  )
  return rows[0]
}
