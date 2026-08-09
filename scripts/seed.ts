import { upsertTeam } from "@/lib/content/teams";
import { upsertSponsors, upsertSponsorPackages } from "@/lib/content/sponsors";
import { upsertStaff } from "@/lib/content/staff";
import { upsertSiteCopy } from "@/lib/content/siteCopy";
import { teams } from "@/lib/teams";
import { sponsors, sponsorPackages } from "@/lib/sponsors";
import { staff } from "@/lib/staff";
import { requireEnv } from "@/lib/env";

async function main() {
  requireEnv(["AWS_REGION", "DYNAMODB_TABLE_NAME"]);

  for (const team of teams) {
    await upsertTeam(team);
  }

  await upsertSponsors(sponsors);
  await upsertSponsorPackages(sponsorPackages);
  await upsertStaff(staff);

  const defaults = [
    {
      slug: "home",
      title: "Welcome to Niagara Jr Elite: Forging Junior Hockey Champions",
      body: "Many Canadians across this nation have dreamt of playing the game at the International level.",
    },
    {
      slug: "team",
      title: "",
      body: "Filter the roster by position. Profiles are placeholders — perfect for swapping in real stats, height/weight, and jersey numbers.",
    },
    {
      slug: "sponsors",
      title: "Partner with Us: Sponsorship Opportunities",
      body: "Join us in supporting the next generation of hockey talent. Explore our sponsorship packages and the impact your contribution makes.",
    },
    {
      slug: "donate",
      title: "Support Niagara Jr Elite: Fuel Our Future",
      body: "Donations support travel, ice time, equipment, video review, and athlete development. This form is a placeholder for Stripe/PayPal integration.",
    },
    {
      slug: "legacy",
      title: "Our Legacy: Past Seasons and Achievements",
      body: "Every season adds to the standard. Browse each roster and team photo by season.",
    },
    {
      slug: "previous-teams",
      title: "Our Legacy: Past Seasons and Achievements",
      body: "Every season adds to the standard. Browse each roster and team photo by season.",
    },
    {
      slug: "about",
      title: "About Us: Building Elite Talent on the Ice",
      body:
        "Since the beginning of time, residents all over Canada have enjoyed watching and playing the game of hockey. Many Canadians across this nation have dreamt of playing the game at the International level.\n\nThis is a chance of a lifetime to travel to Finland, experience European culture, develop friendships and build life skills that will benefit us as a whole in Ontario, and in our great country, Canada.",
    },
  ] as const;

  for (const value of defaults) {
    await upsertSiteCopy(value);
  }

  console.log(
    `Seed complete: inserted ${teams.length} teams, ${sponsors.length} sponsors, ${sponsorPackages.length} packages, ${staff.length} staff members.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
