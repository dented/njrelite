"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { positionLabel, type Player } from "@/lib/players";
import type { Team } from "@/lib/teams";
import PlayersTeamCard from "@/components/players/PlayersTeamCard"

type Filter = "All" | "Forwards" | "Defence" | "Goalies";

type TeamGridProps = {
  team: Team;
};

const TeamGrid = ({ team }: TeamGridProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const currentPlayers = team.players;

  const list = useMemo(() => {
    if (filter === "All") return currentPlayers;
    return currentPlayers.filter((p) => positionLabel(p.position) === filter);
  }, [currentPlayers, filter]);

  const openPlayerModal = (player: Player) => {
    setSelectedPlayer(player);
  };

  const closePlayerModal = () => {
    const modalEl = document.getElementById("playerDetailModal");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bootstrap = (window as any).bootstrap;
    if (bootstrap?.Modal && modalEl) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
      return;
    }

    setSelectedPlayer(null);
  };

  const goToDonateForPlayer = (playerId: string) => {
    closePlayerModal();
    router.push(`/donate?player=${encodeURIComponent(playerId)}#donateForm`);
  };

  useEffect(() => {
    const modalEl = document.getElementById("playerDetailModal");
    if (!modalEl) return;

    const onHidden = () => {
      setSelectedPlayer(null);
    };

    modalEl.addEventListener("hidden.bs.modal", onHidden);

    if (selectedPlayer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bootstrap = (window as any).bootstrap;
      if (bootstrap?.Modal) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      }
    }

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, [selectedPlayer]);

  return (
    <>
      <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <div>
          <h2 className="mb-1">{team.season} Roster</h2>
          <p className="small mb-0">Interactive filter included.</p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <label className="fw-bold text-nowrap" htmlFor="positionFilter">Position</label>
          <select
            id="positionFilter"
            className="form-select"
            style={{ minWidth: 220, borderRadius: 16 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            aria-label="Position filter"
          >
            <option value="All">All</option>
            <option value="Forwards">Forwards</option>
            <option value="Defence">Defence</option>
            <option value="Goalies">Goalies</option>
          </select>
        </div>
      </div>

      <div className="row g-4 mt-1" aria-label="Team roster grid">
        <PlayersTeamCard players={list} canSelect={true} onPlayerSelect={openPlayerModal} />
      </div>

      <div className="modal fade" id="playerDetailModal" tabIndex={-1} aria-labelledby="playerDetailLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content rounded-0" style={{ border: "2px solid rgba(0,0,0,.86)" }}>
            <div className="modal-header" style={{ background: "var(--njr-gray)" }}>
              <h5 className="modal-title fw-bold" id="playerDetailLabel">{selectedPlayer?.name ?? "Player details"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {selectedPlayer && (
              <div className="modal-body">
                <div className="row g-4 align-items-start">
                  <div className="col-12 col-md-5">
                    <div className="rounded-0 overflow-hidden border" style={{ borderColor: "rgba(0,0,0,.14)" }}>
                      <img
                        src={selectedPlayer.large || selectedPlayer.img}
                        alt={`${selectedPlayer.name} profile photo`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: 520 }}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-7">
                    <p className="small text-uppercase fw-bold mb-2" style={{ letterSpacing: ".08em" }}>
                      #{selectedPlayer.jerseyNumber || "TBD"} • {selectedPlayer.position || "Position TBD"}
                    </p>
                    <div className="mb-3">
                      {selectedPlayer.winterTeam || selectedPlayer.preGameMeal || selectedPlayer.favouritePlayer ? (
                        <div className="d-grid gap-2">
                          {selectedPlayer.winterTeam ? (
                            <p className="mb-0"><strong>Winter Team:</strong> {selectedPlayer.winterTeam}</p>
                          ) : null}
                          {selectedPlayer.preGameMeal ? (
                            <p className="mb-0"><strong>Pre-game Meal:</strong> {selectedPlayer.preGameMeal}</p>
                          ) : null}
                          {selectedPlayer.favouritePlayer ? (
                            <p className="mb-0"><strong>Favourite Player:</strong> {selectedPlayer.favouritePlayer}</p>
                          ) : null}
                        </div>
                      ) : (
                        <p className="mb-0">Player bio coming soon.</p>
                      )}
                    </div>

                    <div className="mt-3 d-flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-njr btn-njr-primary"
                        onClick={() => goToDonateForPlayer(selectedPlayer.id)}
                      >
                        Donate to {selectedPlayer.name}
                      </button>
                      <button type="button" className="btn btn-njr btn-njr-secondary" data-bs-dismiss="modal" onClick={closePlayerModal}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamGrid;