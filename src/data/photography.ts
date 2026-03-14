export interface PhotoMeta {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  location?: string;
}

export interface Photo {
  src: string;
  alt: string;
  name?: string;
  isFav?: boolean;
  mediaType?: "image" | "video" | "gif";
  width?: number;
  height?: number;
  meta?: PhotoMeta;
}

export interface TripFolder {
  id: string;
  slug: string;
  country: string;
  coverImage: string;
  description: string;
  date: string;
  photoCount: number;
  favCount: number;
  photos: Photo[];
}
