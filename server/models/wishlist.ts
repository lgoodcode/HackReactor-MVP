import db from '@/database'

export const getWishlist = async (userId: string) => {
  const { rows } = await db.query<WishlistGame>(`SELECT * FROM wishlist WHERE user_id = $1`, [
    userId,
  ])
  return rows
}
