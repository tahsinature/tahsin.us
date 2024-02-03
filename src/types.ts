export type Language = { id: string; name: string; subOnLang: string; subOnEng?: string };

export type WorkPlace = {
  timeRange: string;
  company: string;
  position: string;
  logo: string;
  url: string;
  location: string;
  specialization: string;
};

export type Image = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location: string;
  width: number;
  height: number;
  likeCount: number;
};
