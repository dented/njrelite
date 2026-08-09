import Link from "next/link";
import { getCurrentTeam } from "@/lib/content/teams";
import { getSiteCopy } from "@/lib/content/siteCopy";
import { listStaff } from "@/lib/content/staff";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const team = await getCurrentTeam();
  const copy = await getSiteCopy("about");
  const staff = await listStaff();

  const heroTitle = copy?.title ?? "About Us: Building Elite Talent on the Ice";
  const missionParts = (copy?.body ?? "")
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const coaches = staff.filter((member) => member.type === "Coaches");
  const support = staff.filter((member) => member.type === "Support");
  const sortedStaff = [...coaches, ...support];

  return (
    <main id="main">
      <section className="parallax bg-arena hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.12" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p1" /><span className="puck p2" /><span className="puck p3" /></div>

        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                Our Program
              </div>
              <h1 className="text-white">{heroTitle}</h1>
              <p className="lead">
                Niagara Jr Elite develops complete hockey players — skill, mindset, and character — while competing in top tournaments across Canada.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link className="btn btn-njr btn-njr-primary" href="/team">View the {team.season} Team</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/donate">Support the Program</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Mission</h3>
                {missionParts.length ? (
                  <>
                    <p className="small text-white-50 mb-0">{missionParts[0]}</p>
                    {missionParts[1] ? (
                      <>
                        <hr className="border-light border-opacity-25" />
                        <p className="small text-white-50 mb-0">{missionParts[1]}</p>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className="small text-white-50 mb-0">
                      Since the beginning of time, residents all over Canada have enjoyed watching and playing the game of hockey. Many Canadians across this nation have dreamt of playing the game at the International level.
                    </p>
                    <hr className="border-light border-opacity-25" />
                    <p className="small text-white-50 mb-0">
                      This is a chance of a lifetime to travel to Finland, experience European culture, develop friendships and build life skills that will benefit us as a whole in Ontario, and in our great country, Canada.
                    </p>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
            <div>
              <h2 className="mb-1">Program Staff</h2>
              <p className="small mb-0">Coaches and support staff guiding athlete development year-round.</p>
            </div>
            <Link className="btn btn-njr btn-light" href="/team">Meet Players</Link>
          </div>

          <div className="row g-4">
            {sortedStaff.map((member) => (
              <div className="col-12 col-md-3" key={member.id}>
                <article className="card njr-card h-100">
                  <div className="njr-media">
                    <img src={member.photo} alt={`${member.role} ${member.name}`} loading="lazy" />
                  </div>
                  <div className="card-body p-4">
                    <p className="small text-uppercase text-muted mb-2">{member.type}</p>
                    <h3 className="mb-1">{member.name}</h3>
                    <p className="small mb-0"><strong>{member.role}</strong> — {member.bio}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="p-4 p-md-5 rounded-5 border mt-4" style={{ background: "var(--njr-gray)", borderColor: "rgba(0,0,0,.12)" }}>
            <h3 className="mb-2">Our Commitment</h3>
            <p className="small mb-0">A structured environment that encourages hard work, coachability, and leadership — so players are ready for the next level.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
