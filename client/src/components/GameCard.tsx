export default function GameCard({ game }: { game: Game }) {
  return (
    <div key={game.id} className="game-card">
      <div className="card-img overflow-hidden relative w-full h-[180px]">
        {/* Using background-image over an img because of the fact that the image will be
            restricted to the parent's dimensions. */}
        <div
          className="absolute inset-0 w-full h-full bg-[50%] bg-cover bg-no-repeat rounded-t-lg"
          style={{ backgroundImage: `url(${game.background_image})` }}
        />
      </div>

      <div className="game-card-content p-4 bg-purple-800 rounded-b-lg">
        <div className="platforms-and-ratings">
          <div className="platforms"></div>
        </div>
        <div className="name">
          <h3 className="text-lg font-semibold">{game.name}</h3>
        </div>
      </div>
    </div>
  )
}
