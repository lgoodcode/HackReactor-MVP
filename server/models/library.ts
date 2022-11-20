import db from '@/database'

export const getLibrary = async (userId: string) => {
  const { rows } = await db.query<LibraryGame>(`SELECT * FROM library WHERE user_id = $1`, [userId])
  return rows
}
