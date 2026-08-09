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

export const CoachSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  position: z.enum(["Head Coach", "Assistant Coach", "Trainer"]),
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

export const PresignUploadSchema = z.object({
  prefix: z.enum(["players", "sponsors", "gallery", "tournaments", "site"]),
  fileName: z.string().min(1),
  contentType: z.string().min(1),
});
