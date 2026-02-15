"use client";

const GalleryCarousel = () => {
  return (
    <div id="galleryCarousel" className="carousel slide" data-bs-ride="carousel" aria-label="Photo gallery carousel">
      <div className="carousel-inner rounded-5 overflow-hidden border border-light border-opacity-25 shadow-lg">
        {[
          { src: "/images/gallery-01.jpg", alt: "Team skating during warmups", cap: "Fast starts. Strong finishes." },
          { src: "/images/gallery-02.jpg", alt: "Player taking a slap shot", cap: "Hard shots, smart plays." },
          { src: "/images/gallery-03.jpg", alt: "Goalie making a save", cap: "Big saves when it matters." },
          { src: "/images/gallery-04.jpg", alt: "Team celebrating after scoring", cap: "Culture built on teamwork." },
        ].map((s, i) => (
          <div className={`carousel-item ${i == 0 ? "active" : ""}`} key={s.src}>
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