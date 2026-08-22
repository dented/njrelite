export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  tags: string[];
  sortOrder: number;
};
