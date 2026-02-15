"use client";

const SiteFooter = () => {
  return (
    <footer className="njr-footer py-4">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="small">© 2025 Niagara Jr Elite. All rights reserved.</div>

        <div className="njr-social d-flex gap-2" aria-label="Social media">
          <a href="#" aria-label="X (placeholder)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-7L4.8 22H2l7.3-8.4L1 2h7.1l4.9 6.3L18.9 2zm-1.2 18h1.7L6.2 3.9H4.3L17.7 20z"/></svg>
          </a>
          <a href="#" aria-label="Instagram (placeholder)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5zM18 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;