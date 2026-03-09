// Core Types
export type Player = {
  id: string;
  name: string;
  jerseyNumber: number;
  position: "Forward" | "Defence" | "Goalie" | "";
  short: string;
  img: string;
  large: string;
  raised: number;
  goal: number;
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

// Previous Teams
export const teams: Team[] = [
  {
    id: "njr-elite-2026",
    name: "Niagara Jr Elite",
    season: "2026",
    isCurrent: true,
    raised: 8500,
    goal: 25000,
    players: [
      { id: "2023-1", name: "Steele", jerseyNumber: 0, position: "Forward", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-2", name: "Wilson", jerseyNumber: 0, position: "Defence", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-3", name: "Stevens", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-4", name: "Martone", jerseyNumber: 0, position: "Goalie", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-5", name: "Greenfield", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-6", name: "Cook", jerseyNumber: 0, position: "Goalie", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-7", name: "Popovich", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-8", name: "Perng", jerseyNumber: 0, position: "Defence", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-9", name: "Gill", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-10", name: "Felice", jerseyNumber: 0, position: "Forward", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-11", name: "Lowry", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-12", name: "Risto", jerseyNumber: 0, position: "Forward", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-13", name: "Colavecchia", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-14", name: "Luchka", jerseyNumber: 0, position: "Defence", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-15", name: "Simpson", jerseyNumber: 0, position: "Forward", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-16", name: "Alfieri", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-17", name: "Fitzgerald", jerseyNumber: 0, position: "Forward", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-18", name: "Millette", jerseyNumber: 0, position: "Forward", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-19", name: "Milosovic", jerseyNumber: 29, position: "Defence", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-20", name: "Horth", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
      { id: "2023-21", name: "Howe", jerseyNumber: 0, position: "", short: "", img: "/images/helmet-logo.png", large: "https://placehold.net/avatar-5.png", raised: 0, goal: 0 },
    ],
    coaches: [
      { id: "c1", name: "Mike Bolibruck", position: "Head Coach" },
      { id: "c2", name: "Mike Wilson", position: "Assistant Coach" },
      { id: "c3", name: "Trevor Popovich", position: "Assistant Coach" },
      { id: "c4", name: "Trevor Popovich", position: "Assistant Coach" },
      { id: "c5", name: "TBA", position: "Trainer" },
    ],
    tournaments: [
      {
        id: "t-2026-niagara-invitational",
        name: "Niagara Invitational",
        finalRank: "Top 4",
        photo: {
          src: "https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/597279193_122278419152032922_2964881000856547966_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=znjV-zS98zcQ7kNvwHEjqhk&_nc_oc=AdkMtVDKDrZYfz7a8ByilPXyEr9ybQgFnhtQrwl4fWjHHIkb3bhbP5Soni0RQQFqPy0&_nc_zt=23&_nc_ht=scontent-yyz1-1.xx&_nc_gid=zNg1XWoMPnxDt_Sv34HfIQ&_nc_ss=8&oh=00_AfxzVbOsXyjguR7JQFfEqb8MOFEmvOc7gI_EEUpWu3tj1g&oe=69B39C0E",
          alt: "Niagara Invitational tournament photo",
        },
      },
      {
        id: "t-2025-golden-blades-classic",
        name: "Golden Blades Classic",
        finalRank: "Runner-Up",
        photo: {
          src: "/images/tournament-2025-golden-blades.jpg",
          alt: "Golden Blades Classic tournament photo",
        },
      },
    ],
    photos: [
      { id: "g1", src: "/images/gallery-01.jpg", alt: "Team skating during warmups", cap: "Fast starts. Strong finishes." },
      { id: "g2", src: "/images/gallery-02.jpg", alt: "Player taking a slap shot", cap: "Hard shots, smart plays." },
      { id: "g3", src: "/images/gallery-03.jpg", alt: "Goalie making a save", cap: "Big saves when it matters." },
      { id: "g4", src: "/images/gallery-04.jpg", alt: "Team celebrating after scoring", cap: "Culture built on teamwork." },
    ],
  },
  {
    id: "njr-elite-2024",
    name: "Niagara Jr Elite",
    season: "2024",
    raised: 22000,
    goal: 22000,
    players: [
      { id: "24-p1", name: "Connor Hayes", jerseyNumber: 7, position: "Forward", short: "Captain and primary power-play driver.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 2200, goal: 2200 },
      { id: "24-p2", name: "Ryder Mason", jerseyNumber: 16, position: "Forward", short: "High-speed winger with strong transition play.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1800, goal: 1800 },
      { id: "24-p3", name: "Brett Kline", jerseyNumber: 3, position: "Defence", short: "Minutes-eating defender with elite stick detail.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 2000, goal: 2000 },
      { id: "24-p4", name: "Nolan Price", jerseyNumber: 22, position: "Defence", short: "Reliable first pass and strong gap control.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1500, goal: 1500 },
      { id: "24-p5", name: "Elliot Ward", jerseyNumber: 30, position: "Goalie", short: "Clutch postseason performances.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 2500, goal: 2500 },
    ],
    coaches: [
      { id: "24-c1", name: "Dave Mercer", position: "Head Coach" },
      { id: "24-c2", name: "Liam Foster", position: "Assistant Coach" },
      { id: "24-c3", name: "Ryan Keats", position: "Trainer" },
    ],
    tournaments: [
      {
        id: "t-2024-ontario-cup",
        name: "Ontario Cup",
        finalRank: "Champions",
        photo: {
          src: "/images/tournament-2024-ontario-cup.jpg",
          alt: "2024 Ontario Cup tournament photo",
        },
      },
      {
        id: "t-2024-winter-showcase",
        name: "Winter Showcase",
        finalRank: "Semi-Final",
        photo: {
          src: "/images/tournament-2024-winter-showcase.jpg",
          alt: "2024 Winter Showcase tournament photo",
        },
      },
    ],
    photos: [
      {
        id: "2024-team-photo",
        src: "/images/past-2024.jpg",
        alt: "2024 team photo (placeholder)",
        cap: "Regional Champions",
      },
    ],
    recap: {
      title: "Regional Champions",
      text: "A complete season built on depth and pace. The 2024 group set the standard with disciplined play and relentless work ethic.",
      bullets: [
        "Championship run with clutch special teams",
        "Top-3 goals against in the region",
        "Multiple players advanced to higher levels",
      ],
    },
  },
  {
    id: "njr-elite-2022",
    name: "Niagara Jr Elite",
    season: "2022",
    raised: 15000,
    goal: 15000,
    players: [
      { id: "22-p1", name: "Owen Drake", jerseyNumber: 14, position: "Forward", short: "Original captain and culture setter.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1500, goal: 1500 },
      { id: "22-p2", name: "Colin West", jerseyNumber: 18, position: "Forward", short: "Creative playmaker with great vision.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1300, goal: 1300 },
      { id: "22-p3", name: "Gavin Holt", jerseyNumber: 2, position: "Defence", short: "Defensive zone anchor.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1200, goal: 1200 },
      { id: "22-p4", name: "Nico Flynn", jerseyNumber: 26, position: "Defence", short: "Mobile puck-moving defender.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1000, goal: 1000 },
      { id: "22-p5", name: "Jude Parker", jerseyNumber: 1, position: "Goalie", short: "Steady first-year starter.", img: "https://placehold.net/avatar-5.png", large: "https://static.photos/people/160x100", raised: 1800, goal: 1800 },
    ],
    coaches: [
      { id: "22-c1", name: "Paul Griffin", position: "Head Coach" },
      { id: "22-c2", name: "Evan Doyle", position: "Assistant Coach" },
      { id: "22-c3", name: "Hannah Reid", position: "Trainer" },
    ],
    tournaments: [
      {
        id: "t-2022-regional-open",
        name: "Regional Open",
        finalRank: "Quarter-Final",
        photo: {
          src: "/images/tournament-2022-regional-open.jpg",
          alt: "2022 Regional Open tournament photo",
        },
      },
      {
        id: "t-2022-holiday-cup",
        name: "Holiday Cup",
        finalRank: "Top 8",
        photo: {
          src: "/images/tournament-2022-holiday-cup.jpg",
          alt: "2022 Holiday Cup tournament photo",
        },
      },
    ],
    photos: [
      {
        id: "2022-team-photo",
        src: "/images/past-2022.jpg",
        alt: "2022 team photo (placeholder)",
        cap: "Debut Year",
      },
    ],
    recap: {
      title: "Debut Year",
      text: "The beginning of Niagara Jr Elite - launching the program, establishing standards, and building the foundation.",
      bullets: [
        "Program launch and first tournament appearances",
        "Development-first approach with measurable progress",
        "Strong community support and sponsorship growth",
      ],
    },
  },
];

// Helper to get current team
export const getCurrentTeam = () => teams.find(t => t.isCurrent) || teams[0];

// Backward compatibility export (deprecated - use getCurrentTeam() instead)
export const team = getCurrentTeam();
export const previousTeams = teams.filter(t => !t.isCurrent);
