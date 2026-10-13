import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  initials: z.string().optional(),
  jerseyNumber: z.number().int().nonnegative(),
  position: z.enum(["Forward", "Defence", "Goalie", ""]),
  short: z.string().optional(),
  img: z.string(),
  large: z.string(),
  winterTeam: z.string().optional(),
  preGameMeal: z.string().optional(),
  favouritePlayer: z.string().optional(),
  raised: z.number().nonnegative(),
  goal: z.number().nonnegative(),
});

export const TeamPhotoSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  cap: z.string(),
});

export const GalleryItemSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["photo", "video"]),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1).optional(),
  poster: z.string().min(1).optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
  sortOrder: z.number().int().nonnegative(),
});

export const CoachSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  position: z.enum(["Head Coach", "Assistant Coach", "Trainer"]),
  img: z.string().default("/images/helmet-logo.png"),
});

export const TournamentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  finalRank: z.string(),
  photo: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }),
});

export const TeamRecapSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  bullets: z.array(z.string()),
});

export const TeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  season: z.string().min(1),
  players: z.array(PlayerSchema),
  coaches: z.array(CoachSchema),
  tournaments: z.array(TournamentSchema),
  photos: z.array(TeamPhotoSchema),
  raised: z.number().nonnegative(),
  goal: z.number().nonnegative(),
  isCurrent: z.boolean().optional(),
  recap: TeamRecapSchema.optional(),
});

export const SponsorSchema = z.object({
  name: z.string().min(1),
  logo: z.string().min(1),
  link: z.string().min(1),
});

export const SponsorPackageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nullable(),
  priceLabel: z.string().optional(),
  benefits: z.array(z.string()),
  sortOrder: z.number().int().nonnegative(),
});

export const PaymentSchema = z.object({
  id: z.string().min(1),
  stripeEventId: z.string().min(1),
  kind: z.enum(["donation", "sponsorship"]),
  status: z.literal("succeeded"),
  amount: z.number().int().positive(),
  amountCad: z.number().positive(),
  donationAmountCad: z.number().positive().optional(),
  currency: z.string().length(3),
  description: z.string(),
  teamId: z.string().min(1),
  targetType: z.enum(["Team", "Player", "Sponsor"]),
  playerId: z.string().optional(),
  playerName: z.string().optional(),
  packageId: z.string().optional(),
  packageName: z.string().optional(),
  donorName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  completedAt: z.string().datetime(),
});

export const SiteCopySchema = z.object({
  slug: z.string().min(1),
  title: z.string().optional(),
  body: z.string().optional(),
});

export const StaffTypeSchema = z.enum(["Coaches", "Support"]);

export const StaffMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: StaffTypeSchema,
  role: z.string().min(1),
  bio: z.string().min(1),
  photo: z.string().min(1),
  sortOrder: z.number().int().nonnegative(),
});

export const FundraiserSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  date: z.string().trim().min(1),
  location: z.string().trim().min(1),
  description: z.string().trim().min(1),
  icon: z.string().trim().min(1).max(16),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  image: z.string(),
  featured: z.boolean(),
  offerings: z.array(z.string().trim().min(1)),
  sortOrder: z.number().int().nonnegative(),
});

export const PresignUploadSchema = z.object({
  prefix: z.enum(["players", "sponsors", "gallery", "tournaments", "fundraisers", "site"]),
  fileName: z.string().min(1),
  contentType: z.string().min(1),
});
