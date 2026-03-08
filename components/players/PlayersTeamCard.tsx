import { Player, positionLabel } from "@/lib/players";

const PlayersTeamCard = ({ players }: { players: Player[] }) => {

  const labelFor = (p: Player) => positionLabel(p.position).toLocaleLowerCase();

  return (
    players.map((p) => (
      <div className="col-12 col-md-6 col-lg-4" key={p.id}>
        <article className="card njr-card h-100">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-sm-row gap-3 align-items-start">
              <div className="rounded-circle overflow-hidden border border-4"
                style={{ width: 150, height: 150, borderColor: "var(--njr-red)", flex: "0 0 auto" }}>
                <img src={p.img} alt={`${p.name} headshot`} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>

              <div className="flex-grow-1">
                <div className="fw-bold fs-5">{p.name}</div>
                <div className="mt-1 d-flex flex-wrap gap-2">
                  <span className="chip">#{p.jerseyNumber}</span>
                  <span className="chip">{labelFor(p)}</span>
                </div>
                <p className="small mt-2 mb-3">{p.short}</p>

                <div className="d-flex flex-wrap gap-2">
                  <a className="btn btn-njr btn-njr-primary" href={`/donate?player=${p.id}#donateForm`} aria-label={`Donate to ${p.name}`}>
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