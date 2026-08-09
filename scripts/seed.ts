import { MongoClient } from "mongodb";
import { requireEnv } from "@/lib/env";
import { teams } from "@/lib/teams";
import { sponsors, sponsorPackages } from "@/lib/sponsors";
import { staff } from "@/lib/staff";

async function main() {
  const env = requireEnv(["MONGODB_URI"]);
  const uri = env.MONGODB_URI as string;
  const dbName = env.MONGODB_DB;

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db(dbName);

    const teamsCol = db.collection("teams");
    const sponsorsCol = db.collection("sponsors");
    const packagesCol = db.collection("sponsorPackages");
    const staffCol = db.collection("staff");
    const siteCopyCol = db.collection("siteCopy");

    await teamsCol.createIndex({ id: 1 }, { unique: true });
    await teamsCol.createIndex({ isCurrent: 1 });
    await staffCol.createIndex({ id: 1 }, { unique: true });
    await staffCol.createIndex({ type: 1, name: 1 });

    // Replace content so the DB exactly mirrors the current static dataset.
    await teamsCol.deleteMany({});
    await sponsorsCol.deleteMany({});
    await packagesCol.deleteMany({});
    await staffCol.deleteMany({});
    await siteCopyCol.deleteMany({});

    const now = new Date();

    if (teams.length) {
      await teamsCol.insertMany(teams.map((t) => ({ ...t, updatedAt: now })));
    }

    if (sponsors.length) {
      await sponsorsCol.insertMany(sponsors.map((s) => ({ ...s, updatedAt: now })));
    }

    if (sponsorPackages.length) {
      await packagesCol.insertMany(sponsorPackages.map((p) => ({ ...p, updatedAt: now })));
    }

    if (staff.length) {
      await staffCol.insertMany(staff.map((member) => ({ ...member, updatedAt: now })));
    }

    // Site copy defaults are the current hardcoded hero text.
    await siteCopyCol.insertMany([
      {
        slug: "home",
        title: "Welcome to Niagara Jr Elite: Forging Junior Hockey Champions",
        body: "Many Canadians across this nation have dreamt of playing the game at the International level.",
        updatedAt: now,
      },
      {
        slug: "team",
        title: "",
        body: "Filter the roster by position. Profiles are placeholders — perfect for swapping in real stats, height/weight, and jersey numbers.",
        updatedAt: now,
      },
      {
        slug: "sponsors",
        title: "Partner with Us: Sponsorship Opportunities",
        body: "Join us in supporting the next generation of hockey talent. Explore our sponsorship packages and the impact your contribution makes.",
        updatedAt: now,
      },
      {
        slug: "donate",
        title: "Support Niagara Jr Elite: Fuel Our Future",
        body: "Donations support travel, ice time, equipment, video review, and athlete development. This form is a placeholder for Stripe/PayPal integration.",
        updatedAt: now,
      },
      {
        slug: "legacy",
        title: "Our Legacy: Past Seasons and Achievements",
        body: "Every season adds to the standard. Browse each roster and team photo by season.",
        updatedAt: now,
      },
      {
        slug: "previous-teams",
        title: "Our Legacy: Past Seasons and Achievements",
        body: "Every season adds to the standard. Browse each roster and team photo by season.",
        updatedAt: now,
      },
      {
        slug: "about",
        title: "About Us: Building Elite Talent on the Ice",
        body:
          "Since the beginning of time, residents all over Canada have enjoyed watching and playing the game of hockey. Many Canadians across this nation have dreamt of playing the game at the International level.\n\nThis is a chance of a lifetime to travel to Finland, experience European culture, develop friendships and build life skills that will benefit us as a whole in Ontario, and in our great country, Canada.",
        updatedAt: now,
      },
    ]);

    console.log(`Seed complete: inserted ${teams.length} teams, ${sponsors.length} sponsors, ${sponsorPackages.length} packages, ${staff.length} staff members.`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
