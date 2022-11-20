import db from '@/database'

// Create or authenticate a user. Returns the user id if successful, or null if not.

export const createUser = async (email: string, password: string) => {
  // Check if the email is already in use
  const { rows: check } = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

  if (check.length) {
    return null
  }

  // Create the user and encrypt the password with bcrypt and return the user
  const { rows } = await db.query<User>(
    `INSERT INTO users (email, password)
    VALUES ($1, crypt($2, gen_salt('bf')))
    RETURNING id`,
    [email, password]
  )

  return rows[0].id
}

export const authenticate = async (email: string, password: string) => {
  const { rows } = await db.query<User>(
    `SELECT id
    FROM users
    WHERE email = $1 AND password = crypt($2, password)`,
    [email, password]
  )

  return rows.length ? rows[0].id : null
}
