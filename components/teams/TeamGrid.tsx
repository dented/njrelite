"use client";

import { useMemo, useState } from "react";
import { positionLabel, type Player } from "@/lib/players";
import { team } from "@/lib/teams";
import PlayersTeamCard from "@/components/players/PlayersTeamCard"

type Filter = "All" | "Forwards" | "Defence" | "Goalies";

const TeamGrid = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const currentPlayers = team.players;

  const list = useMemo(() => {
    if (filter === "All") return currentPlayers;
    return currentPlayers.filter((p) => positionLabel(p.position) === filter);
  }, [currentPlayers, filter]);

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
        <PlayersTeamCard players={list} />
      </div>
    </>
  );
}

export default TeamGrid;