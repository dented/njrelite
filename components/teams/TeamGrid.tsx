"use client";

import { useEffect, useMemo, useState } from "react";
import { positionLabel, type Player } from "@/lib/players";
import type { Team } from "@/lib/teams";
import PlayersTeamCard from "@/components/players/PlayersTeamCard"

type Filter = "All" | "Forwards" | "Defence" | "Goalies";

type TeamGridProps = {
  team: Team;
};

const TeamGrid = ({ team }: TeamGridProps) => {
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

  const closePlayerModal = () => setSelectedPlayer(null);

  useEffect(() => {
    if (!selectedPlayer) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePlayerModal();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [selectedPlayer]);

  const progressPercent = selectedPlayer && selectedPlayer.goal > 0
    ? Math.max(0, Math.min(100, Math.round((selectedPlayer.raised / selectedPlayer.goal) * 100)))
    : 0;

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
        <PlayersTeamCard players={list} onPlayerSelect={openPlayerModal} />
      </div>

      {selectedPlayer && (
        <div
          className="njr-player-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="playerDetailLabel"
          onClick={closePlayerModal}
        >
          <div className="njr-player-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: "var(--njr-gray)" }}>
              <h5 className="modal-title fw-bold" id="playerDetailLabel">{selectedPlayer.name}</h5>
              <button type="button" className="btn-close" onClick={closePlayerModal} aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="row g-4 align-items-start">
                <div className="col-12 col-md-5">
                  <div className="rounded-4 overflow-hidden border" style={{ borderColor: "rgba(0,0,0,.14)" }}>
                    <img
                      src={selectedPlayer.large || selectedPlayer.img}
                      alt={`${selectedPlayer.name} profile photo`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: 380 }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-7">
                  <p className="small text-uppercase fw-bold mb-2" style={{ letterSpacing: ".08em" }}>
                    #{selectedPlayer.jerseyNumber || "TBD"} • {selectedPlayer.position || "Position TBD"}
                  </p>
                  <p className="mb-3">{selectedPlayer.short || "Player bio coming soon."}</p>

                  <div className="p-3 rounded-4" style={{ background: "var(--njr-gray)", border: "1px solid rgba(0,0,0,.12)" }}>
                    <div className="d-flex justify-content-between small mb-2">
                      <span><strong>Raised:</strong> ${selectedPlayer.raised.toLocaleString()}</span>
                      <span><strong>Goal:</strong> ${selectedPlayer.goal.toLocaleString()}</span>
                    </div>
                    <div className="progress" style={{ height: 14, borderRadius: 999, border: "1px solid rgba(0,0,0,.12)" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg,#FF0000,rgba(255,0,0,.72))" }}
                        aria-valuenow={progressPercent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="small mb-0 mt-2">{progressPercent}% of target funded</p>
                  </div>

                  <div className="mt-3 d-flex flex-wrap gap-2">
                    <a
                      className="btn btn-njr btn-njr-primary"
                      href={`/donate?player=${selectedPlayer.id}#donateForm`}
                      onClick={closePlayerModal}
                    >
                      Donate to {selectedPlayer.name}
                    </a>
                    <button type="button" className="btn btn-njr btn-njr-secondary" onClick={closePlayerModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamGrid;