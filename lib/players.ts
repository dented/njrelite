import { getCurrentTeam, type Player } from "@/lib/teams";

export type { Player };

export const players: Player[] = getCurrentTeam().players;

export const positionLabel = (p: Player["position"]) =>
  p === "Defence" ? "Defence" : p === "Goalie" ? "Goalies" : "Forwards";
