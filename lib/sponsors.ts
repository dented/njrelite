export type Sponsor = {
  name: string;
  logo: string;
  link: string;
};

export const sponsors: Sponsor[] = [
  { name: "HockeyTech", logo: "https://placehold.co/200x100?text=HockeyTech", link: "https://www.hockeytech.com/" },
  { name: "Pure Hockey", logo: "https://placehold.co/200x100?text=Pure+Hockey", link: "https://www.purehockey.com/" },
  { name: "Bauer Hockey", logo: "https://placehold.co/200x100?text=Bauer+Hockey", link: "https://www.bauer.com/" },
  { name: "CCM Hockey", logo: "https://placehold.co/200x100?text=CCM+Hockey", link: "https://www.ccmhockey.com/" },
  { name: "Reebok Hockey", logo: "https://placehold.co/200x100?text=Reebok+Hockey", link: "https://www.reebok.com/us/hockey" },
  { name: "Easton Hockey", logo: "https://placehold.co/200x100?text=Easton+Hockey", link: "https://www.eastonhockey.com/" },
  { name: "Warrior Hockey", logo: "https://placehold.co/200x100?text=Warrior+Hockey", link: "https://www.warrior.com/hockey" },
  { name: "Sherwood Hockey", logo: "https://placehold.co/200x100?text=Sherwood+Hockey", link: "https://www.sher-wood.com/" },
];

export type SponsorPackage = {
  id: string;
  name: string;
  price: number | null;
  priceLabel?: string;
  benefits: string[];
};

export const sponsorPackages: SponsorPackage[] = [
  {
    id: "bronze-medal",
    name: "BRONZE MEDAL",
    price: 500,
    benefits: [
      "Your company will be recognized on our website, all social media and all print ads.",
      "All constant contact letters to our entire database continually until January 2027.",
    ],
  },
  {
    id: "silver-medal",
    name: "SILVER MEDAL",
    price: 1000,
    benefits: [
      "Sponsor bars (your company name) on jerseys.",
      "Your company will be recognized on our website, all social media and all print ads.",
      "All constant contact letters to our entire database for the next year.",
      "Link from our website to yours.",
    ],
  },
  {
    id: "gold-medal",
    name: "GOLD MEDAL",
    price: 2500,
    benefits: [
      "Sponsor bars (your company name) on jerseys.",
      "Your company will be recognized on our website, all social media and all print ads.",
      "All constant contact letters to our entire database for the next year.",
      "Link from our website to yours.",
      "Individual player sponsor with a direct hand in sponsoring a child and giving them a chance of a lifetime.",
    ],
  },
  {
    id: "tournament-sponsor",
    name: "Tournament Sponsor",
    price: 5000,
    priceLabel: "$5,000.00++",
    benefits: [
      "Your name on the tournament.",
      "Your company will be recognized on our website, all social media and all print ads.",
      "All constant contact letters to our entire database for the next year.",
      "Link from our website to yours.",
    ],
  },
  {
    id: "additional-sponsorship",
    name: "Additional Sponsorship",
    price: null,
    priceLabel: "Custom",
    benefits: [
      "Clothing - track suits, warm up gear.",
      "Hockey jersey.",
      "Hockey equipment (e.g., custom sticks).",
      "Warm-up gear (e.g., shoes, track suits).",
      "Skates.",
    ],
  },
];