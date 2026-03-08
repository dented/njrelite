"use client";

import { team } from "@/lib/teams";

const GalleryCarousel = () => {
  return (
    <div id="galleryCarousel" className="carousel slide" data-bs-ride="carousel" aria-label="Photo gallery carousel">
      <div className="carousel-inner rounded-5 overflow-hidden border border-light border-opacity-25 shadow-lg">
        {team.photos.map((s, i) => (
          <div className={`carousel-item ${i == 0 ? "active" : ""}`} key={s.id}>
            <img src={s.src} className="d-block w-100" alt={s.alt} style={{ height: 440, objectFit: "cover" }} loading="lazy" />
            <div className="carousel-caption text-start">
              <span className="badge bg-black bg-opacity-50 border border-light border-opacity-25 rounded-pill px-3 py-2 fw-bold">
                {s.cap}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev" aria-label="Previous slide">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next" aria-label="Next slide">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default GalleryCarousel;