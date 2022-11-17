/**
 * Debounces or throttles a function. Any new calls to the function will reset
 * the timer and the function will be called after the timer has elapsed.
 */
export default function debounce(func: (...args: any) => void, timeout = 10) {
  let timer: number
  let time = Date.now()

  return (...args: any) => {
    if (timer) clearTimeout(timer)

    time = Date.now()

    timer = setTimeout(() => {
      if (Date.now() - time > timeout) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        func.apply(this, args)
      }
    }, timeout)
  }
}
