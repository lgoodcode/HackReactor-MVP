import apiFetcher from './apiFetcher'

/**
 * Handles adding, updating, and removing a game to/from the user's library or wishlist.
 * Takes the game id and the type of list to add the game to. If the game was added it
 * will return the game object with the progress set to "not started".
 */
export default function handleGame<T = any>(action: GameAction) {
  return async function (id: number, type: 'library' | 'wishlist', progress?: GameProgress) {
    const { data, error } = await apiFetcher<T>(
      `/${type}/${id}${action !== 'update' ? '' : '?progress=' + progress}`,
      {
        credentials: 'include',
        method: action === 'add' ? 'POST' : action === 'update' ? 'PUT' : 'DELETE',
      }
    )

    if (error) {
      console.error(error)
      return null
    }
    return data
  }
}
