"use client";

import { useEffect, useState } from "react";

const DEFAULT_PROFILE_IMAGE = "/images/helmet-logo.png";

type ProfileImageProps = {
  name: string;
  src?: string | null;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function ProfileImage({ name, src, alt, className = "", loading = "lazy" }: ProfileImageProps) {
  const [imageSrc, setImageSrc] = useState(src?.trim() || DEFAULT_PROFILE_IMAGE);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageSrc(src?.trim() || DEFAULT_PROFILE_IMAGE);
    setImageFailed(false);
  }, [src]);

  return (
    <div className={`profile-image ${className}`.trim()}>
      {!imageFailed ? (
        <img
          src={imageSrc}
          alt={alt}
          loading={loading}
          onError={() => {
            if (imageSrc !== DEFAULT_PROFILE_IMAGE) {
              setImageSrc(DEFAULT_PROFILE_IMAGE);
            } else {
              setImageFailed(true);
            }
          }}
        />
      ) : (
        <span className="profile-image-initials" role="img" aria-label={`${name} profile photo unavailable`}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}
