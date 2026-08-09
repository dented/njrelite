import type { Player } from "@/lib/players";
import type { KeyboardEvent } from "react";
import { positionLabel } from "@/lib/players";

type PlayersTeamCardProps = {
  players: Player[];
  onPlayerSelect: (player: Player) => void;
};

const PlayersTeamCard = ({ players, onPlayerSelect }: PlayersTeamCardProps) => {

  const labelFor = (p: Player) => positionLabel(p.position).toLocaleLowerCase();
  const onCardKeyDown = (e: KeyboardEvent<HTMLElement>, p: Player) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlayerSelect(p);
    }
  };

  return (
    players.map((p) => (
      <div className="col-12 col-md-6 col-lg-4" key={p.id}>
        <article
          className="card njr-card player-card-clickable h-100"
          role="button"
          tabIndex={0}
          onClick={() => onPlayerSelect(p)}
          onKeyDown={(e) => onCardKeyDown(e, p)}
          aria-label={`View full profile for ${p.name}`}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-sm-row gap-3 align-items-start">
              <div className="rounded-circle overflow-hidden border border-4"
                style={{ width: 150, height: 150, borderColor: "var(--njr-red)", flex: "0 0 auto" }}>
                <img src={p.img} alt={`${p.name} headshot`} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>

              <div className="flex-grow-1">
                <div className="fw-bold fs-5">{p.name} - #{p.jerseyNumber}</div>
                <p className="small mt-2 mb-3">{p.short}</p>
                <p className="small fw-bold text-danger mb-3">Tap card to view full profile</p>

                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-njr btn-njr-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayerSelect(p);
                    }}
                    aria-label={`View full profile for ${p.name}`}
                  >
                    View
                  </button>

                  <a
                    className="btn btn-njr btn-njr-primary"
                    href={`/donate?player=${p.id}#donateForm`}
                    aria-label={`Donate to ${p.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Donate to a Player 🏒
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    ))
  );
}

export default PlayersTeamCard;