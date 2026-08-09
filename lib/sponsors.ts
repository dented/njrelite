export type Sponsor = {
  name: string;
  logo: string;
  link: string;
};

export type SponsorPackage = {
  id: string;
  name: string;
  price: number | null;
  priceLabel?: string;
  benefits: string[];
  sortOrder: number;
};