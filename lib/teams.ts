export type Player = {
  id: string;
  name: string;
  initials?: string;
  jerseyNumber: number;
  position: "Forward" | "Defence" | "Goalie" | "";
  short?: string;
  winterTeam?: string;
  preGameMeal?: string;
  favouritePlayer?: string;
  img: string;
  large: string;
  raised: number;
  goal: number | 5500;
};

export type TeamPhoto = {
  id: string;
  src: string;
  alt: string;
  cap: string;
};

export type CoachPosition = "Head Coach" | "Assistant Coach" | "Trainer";

export type Coach = {
  id: string;
  name: string;
  position: CoachPosition;
};

export type Tournament = {
  id: string;
  name: string;
  finalRank: string;
  photo: {
    src: string;
    alt: string;
  };
};

export type TeamRecap = {
  title: string;
  text: string;
  bullets: string[];
};

export type Team = {
  id: string;
  name: string;
  season: string;
  players: Player[];
  coaches: Coach[];
  tournaments: Tournament[];
  photos: TeamPhoto[];
  raised: number;
  goal: number;
  isCurrent?: boolean;
  recap?: TeamRecap;
};
