import type { Player } from "@/lib/teams";

export type { Player };

export const comparePlayersByLastName = (a: Player, b: Player) => {
  const lastName = (name: string) => name.trim().split(/\s+/).pop() ?? "";
  return lastName(a.name).localeCompare(lastName(b.name), "en", { sensitivity: "base" })
    || a.name.trim().localeCompare(b.name.trim(), "en", { sensitivity: "base" });
};

export const positionLabel = (p: Player["position"]) =>
  p === "Defence" ? "Defence" : p === "Goalie" ? "Goalies" : "Forwards";
