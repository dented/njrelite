"use client";

import { useEffect, useMemo, useState } from "react";

type TimeLeft = { days: number; hours: number; mins: number; secs: number; live: boolean };

function calc(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  const total = Math.max(diff, 0);
  const s = Math.floor(total / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return { days, hours, mins, secs, live: diff <= 0 };
}

const Countdown = ({ iso }: { iso: string }) => {
  const target = useMemo(() => new Date(iso), [iso]);
  const [t, setT] = useState<TimeLeft>(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="row g-2 mt-3" aria-label="Countdown timer">
        {[
          ["Days", t.days],
          ["Hours", t.hours],
          ["Minutes", t.mins],
          ["Seconds", t.secs],
        ].map(([label, val]) => (
          <div className="col-6 col-md-3" key={label}>
            <div className="text-center rounded-4 p-3 border border-light border-opacity-25 bg-black bg-opacity-25">
              <div className="fs-3 fw-bold text-white">{pad(Number(val))}</div>
              <div className="small text-white-50">{label}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="small text-white-50 mt-2" aria-live="polite">
        {t.live ? "Tournament is live!" : `Countdown running. ${t.days} days remaining.`}
      </p>
    </>
  );
}

export default Countdown;