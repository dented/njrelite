export type Player = {
  id: string;
  name: string;
  position: "Forward" | "Defender" | "Goalie";
  short: string;
  img: string;
  large: string;
};

export const players: Player[] = [
  { id: "p1", name: "Liam Carter", position: "Forward", short: "Quick release, high-motor forechecker.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p2", name: "Noah Bennett", position: "Forward", short: "Two-way center with strong faceoffs.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p3", name: "Ethan Roy", position: "Forward", short: "Power winger who creates net-front chaos.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p4", name: "Mason Dupont", position: "Defender", short: "Smooth skating D, first pass specialist.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p5", name: "Jackson Lee", position: "Defender", short: "Shutdown defender with elite gap control.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p6", name: "Aiden Singh", position: "Defender", short: "Big-body blue-liner with a heavy shot.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p7", name: "Oliver Chen", position: "Goalie", short: "Calm, positional goalie with fast gloves.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p8", name: "Caleb Martin", position: "Goalie", short: "Aggressive angles, strong rebound control.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p9", name: "Lucas Tremblay", position: "Forward", short: "Playmaker with vision and pace.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
  { id: "p10", name: "Wyatt Johnson", position: "Defender", short: "Mobile D, excellent stick detail.", img: "https://placehold.co/80x50", large: "https://placehold.co/160x100" },
];

export const positionLabel = (p: Player["position"]) =>
  p === "Defender" ? "Defenders" : p === "Goalie" ? "Goalies" : "Forwards";
