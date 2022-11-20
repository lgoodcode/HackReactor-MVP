import styles from './simple.module.css'

export default function SimpleLoader({ w = 24, h = 24 }) {
  return (
    <span
      className={styles.loader}
      style={{
        width: w,
        height: h,
      }}
    ></span>
  )
}
