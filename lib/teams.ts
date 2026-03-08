// Core Types
export type Player = {
  id: string;
  name: string;
  jerseyNumber: number;
  position: "Forward" | "Defence" | "Goalie";
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
    id: "njr-elite-2025",
    name: "Niagara Jr Elite",
    season: "2025",
    isCurrent: true,
    raised: 8500,
    goal: 25000,
    players: [
      { id: "p1", name: "Liam Carter", jerseyNumber: 9, position: "Forward", short: "Quick release, high-motor forechecker.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 450, goal: 1500 },
      { id: "p2", name: "Noah Bennett", jerseyNumber: 11, position: "Forward", short: "Two-way center with strong faceoffs.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 720, goal: 1500 },
      { id: "p3", name: "Ethan Roy", jerseyNumber: 17, position: "Forward", short: "Power winger who creates net-front chaos.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 890, goal: 1500 },
      { id: "p4", name: "Mason Dupont", jerseyNumber: 4, position: "Defence", short: "Smooth skating D, first pass specialist.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1200, goal: 2000 },
      { id: "p5", name: "Jackson Lee", jerseyNumber: 5, position: "Defence", short: "Shutdown defender with elite gap control.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 650, goal: 2000 },
      { id: "p6", name: "Aiden Singh", jerseyNumber: 27, position: "Defence", short: "Big-body blue-liner with a heavy shot.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 380, goal: 2000 },
      { id: "p7", name: "Oliver Chen", jerseyNumber: 31, position: "Goalie", short: "Calm, positional goalie with fast gloves.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1500, goal: 2500 },
      { id: "p8", name: "Caleb Martin", jerseyNumber: 33, position: "Goalie", short: "Aggressive angles, strong rebound control.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 920, goal: 2500 },
      { id: "p9", name: "Lucas Tremblay", jerseyNumber: 19, position: "Forward", short: "Playmaker with vision and pace.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 560, goal: 1500 },
      { id: "p10", name: "Wyatt Johnson", jerseyNumber: 24, position: "Defence", short: "Mobile D, excellent stick detail.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 730, goal: 2000 },
    ],
    coaches: [
      { id: "c1", name: "Matt Reynolds", position: "Head Coach" },
      { id: "c2", name: "Sophie Laurent", position: "Assistant Coach" },
      { id: "c3", name: "Tyler Brooks", position: "Trainer" },
    ],
    tournaments: [
      {
        id: "t-2025-niagara-invitational",
        name: "Niagara Invitational",
        finalRank: "Top 4",
        photo: {
          src: "/images/tournament-2025-niagara.jpg",
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
      { id: "24-p1", name: "Connor Hayes", jerseyNumber: 7, position: "Forward", short: "Captain and primary power-play driver.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 2200, goal: 2200 },
      { id: "24-p2", name: "Ryder Mason", jerseyNumber: 16, position: "Forward", short: "High-speed winger with strong transition play.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1800, goal: 1800 },
      { id: "24-p3", name: "Brett Kline", jerseyNumber: 3, position: "Defence", short: "Minutes-eating defender with elite stick detail.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 2000, goal: 2000 },
      { id: "24-p4", name: "Nolan Price", jerseyNumber: 22, position: "Defence", short: "Reliable first pass and strong gap control.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1500, goal: 1500 },
      { id: "24-p5", name: "Elliot Ward", jerseyNumber: 30, position: "Goalie", short: "Clutch postseason performances.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 2500, goal: 2500 },
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
    id: "njr-elite-2023",
    name: "Niagara Jr Elite",
    season: "2023",
    raised: 18500,
    goal: 20000,
    players: [
      { id: "23-p1", name: "Avery Cole", jerseyNumber: 12, position: "Forward", short: "Top-line finisher with heavy release.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 2100, goal: 2100 },
      { id: "23-p2", name: "Brady Ellis", jerseyNumber: 10, position: "Forward", short: "Two-way center and faceoff specialist.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1900, goal: 1900 },
      { id: "23-p3", name: "Logan Sharp", jerseyNumber: 6, position: "Defence", short: "Physical shutdown defender.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1700, goal: 1700 },
      { id: "23-p4", name: "Miles Rowan", jerseyNumber: 25, position: "Defence", short: "Transition-focused blue-liner.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1400, goal: 1400 },
      { id: "23-p5", name: "Tate Moreno", jerseyNumber: 35, position: "Goalie", short: "Consistent high-danger save rate.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 2200, goal: 2200 },
    ],
    coaches: [
      { id: "23-c1", name: "Eric Nolan", position: "Head Coach" },
      { id: "23-c2", name: "Noah Briggs", position: "Assistant Coach" },
      { id: "23-c3", name: "Maya Chen", position: "Trainer" },
    ],
    tournaments: [
      {
        id: "t-2023-nationals",
        name: "National Championship",
        finalRank: "Runner-Up",
        photo: {
          src: "/images/tournament-2023-nationals.jpg",
          alt: "2023 National Championship tournament photo",
        },
      },
      {
        id: "t-2023-fall-classic",
        name: "Fall Classic",
        finalRank: "Top 4",
        photo: {
          src: "/images/tournament-2023-fall-classic.jpg",
          alt: "2023 Fall Classic tournament photo",
        },
      },
    ],
    photos: [
      {
        id: "2023-team-photo",
        src: "/images/past-2023.jpg",
        alt: "2023 team photo (placeholder)",
        cap: "Nationals Runner-Up",
      },
    ],
    recap: {
      title: "Nationals Runner-Up",
      text: "A high-tempo season with standout goaltending and consistent scoring across the lineup.",
      bullets: [
        "Strong playoff performance and late-game execution",
        "Team culture built on accountability",
        "Breakout tournament performances",
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
      { id: "22-p1", name: "Owen Drake", jerseyNumber: 14, position: "Forward", short: "Original captain and culture setter.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1500, goal: 1500 },
      { id: "22-p2", name: "Colin West", jerseyNumber: 18, position: "Forward", short: "Creative playmaker with great vision.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1300, goal: 1300 },
      { id: "22-p3", name: "Gavin Holt", jerseyNumber: 2, position: "Defence", short: "Defensive zone anchor.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1200, goal: 1200 },
      { id: "22-p4", name: "Nico Flynn", jerseyNumber: 26, position: "Defence", short: "Mobile puck-moving defender.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1000, goal: 1000 },
      { id: "22-p5", name: "Jude Parker", jerseyNumber: 1, position: "Goalie", short: "Steady first-year starter.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100", raised: 1800, goal: 1800 },
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
