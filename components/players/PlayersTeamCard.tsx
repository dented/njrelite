import type { Player } from "@/lib/players";

type PlayersTeamCardProps = {
  players: Player[];
  canSelect: boolean;
  onPlayerSelect?: (player: Player) => void;
};

const PlayersTeamCard = ({ players, canSelect, onPlayerSelect }: PlayersTeamCardProps) => {

  const playerSelectedHandler = (player: Player) => {
    onPlayerSelect?.(player);
  };

  return (
    players.map((p) => {
      return (
      <div className="col-12 col-md-6 col-lg-4" key={p.id} >
        <article className="card njr-card h-100">
        <div className="card-body p-3 p-lg-4 d-flex flex-column">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={p.img || "/images/helmet-logo.png"}
                alt={p.name}
                className="player-avatar rounded-4 object-fit-cover"
                style={{ width: 64, height: 64 }}
              />

              <div className="flex-grow-1">
                <span className="badge rounded-pill player-number mb-2">
                  #{p.jerseyNumber}
                </span>

                <h2 className="h5 fw-bold mb-1">{p.name}</h2>
                <p className="text-secondary small mb-0">{p.winterTeam || "Profile coming soon"}</p>
              </div>
            </div>

            <div className="d-flex gap-2 mt-auto">
              { canSelect && (
                <button
                  type="button"
                  className="btn btn-outline-dark flex-fill fw-semibold"
                  onClick={() => playerSelectedHandler(p)}
                  aria-label={`View ${p.name} profile`}
                >
                  View profile
                </button>
              )}
              <a
                className="btn btn-block btn-njr btn-njr-primary"
                href={`/donate?player=${p.id}#donateForm`}
                aria-label={`Donate to ${p.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                Donate to Player
              </a>
            </div>
          </div>
        </article>
      </div>
      );
    })
  );
}

export default PlayersTeamCard;