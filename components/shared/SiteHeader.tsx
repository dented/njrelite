"use client";

import Link from "next/link";
import Image from "next/image";

const SiteHeader = () => {
  return (
    <header className="njr-header sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand mx-auto mx-lg-0 d-flex align-items-center gap-2" href="/" aria-label="Niagara Jr Elite home">
            <Image src="/images/logo-two-toned.png" alt="Niagara Jr Elite maple leaf logo" className="njr-logo" width={150} height={50} priority />
            <span className="text-white fw-bold">Niagara Jr Elite</span>
          </Link>

          <button
            className="navbar-toggler btn btn-njr btn-njr-ghost"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#primaryNav"
            aria-controls="primaryNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="primaryNav">
            <ul className="navbar-nav gap-1 gap-lg-2 align-items-lg-center text-center">
              <li className="nav-item"><Link className="nav-link fw-bold px-3 rounded-pill" href="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold px-3 rounded-pill" href="/team">Team</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold px-3 rounded-pill" href="/sponsors">Sponsors</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold px-3 rounded-pill" href="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold px-3 rounded-pill" href="/previous-teams">Previous Teams</Link></li>
              <li className="nav-item"><Link className="btn btn-outline-light fw-bold" href="/donate">Donate</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .nav-link:hover { background: rgba(255,255,255,.16); transform: translateY(-1px); transition: .16s ease; }
      `}</style>
    </header>
  );
}

export default SiteHeader;