export default function Logo() {
  return (
    <div className="h-screen w-screen flex flex-col centered">
      <div>
        <img src="/menelaus.svg" width={400} height={400} alt="logo" />
      </div>

      <div>
        <h2
          className="font-mont"
          style={{
            fontSize: '2.7rem',
            lineHeight: '3.5rem',
          }}
        >
          Tracking the games you&#39;ve played or want made easy
        </h2>
      </div>
    </div>
  )
}
