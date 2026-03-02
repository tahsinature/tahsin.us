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
  width?: number;
  height?: number;
  meta?: PhotoMeta;
  myFav?: boolean;
}

export interface TripFolder {
  slug: string;
  country: string;
  coverImage: string;
  description: string;
  date: string;
  photoCount: number;
  photos: Photo[];
}

export const trips: TripFolder[] = [
  {
    slug: "japan",
    country: "Japan",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    description: "Cherry blossoms, temples, and neon-lit streets",
    date: "March 2025",
    photoCount: 8,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        alt: "Fushimi Inari Shrine gates",
        meta: { camera: "Sony A7IV", lens: "24-70mm f/2.8 GM", focalLength: "35mm", aperture: "f/4", shutterSpeed: "1/250s", iso: "200", location: "Fushimi Inari, Kyoto" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        alt: "Tokyo street at night",
        meta: { camera: "Sony A7IV", lens: "35mm f/1.4 GM", focalLength: "35mm", aperture: "f/1.8", shutterSpeed: "1/60s", iso: "3200", location: "Shinjuku, Tokyo" },
      },
      {
        src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
        alt: "Mount Fuji at sunrise",
        meta: { camera: "Sony A7IV", lens: "70-200mm f/2.8 GM", focalLength: "135mm", aperture: "f/8", shutterSpeed: "1/500s", iso: "100", location: "Lake Kawaguchi, Yamanashi" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80",
        alt: "Cherry blossoms in Kyoto",
        meta: { camera: "Sony A7IV", lens: "85mm f/1.4 GM", focalLength: "85mm", aperture: "f/2", shutterSpeed: "1/1000s", iso: "100", location: "Philosopher's Path, Kyoto" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80",
        alt: "Traditional Japanese garden",
        meta: { camera: "Sony A7IV", lens: "24-70mm f/2.8 GM", focalLength: "24mm", aperture: "f/5.6", shutterSpeed: "1/125s", iso: "200", location: "Kenroku-en, Kanazawa" },
      },
      {
        src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
        alt: "Shibuya crossing",
        meta: { camera: "Sony A7IV", lens: "16-35mm f/2.8 GM", focalLength: "16mm", aperture: "f/4", shutterSpeed: "1/30s", iso: "800", location: "Shibuya, Tokyo" },
      },
      {
        src: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800&q=80",
        alt: "Japanese temple in autumn",
        meta: { camera: "Sony A7IV", lens: "24-70mm f/2.8 GM", focalLength: "50mm", aperture: "f/4", shutterSpeed: "1/200s", iso: "100", location: "Kinkaku-ji, Kyoto" },
      },
      {
        src: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
        alt: "Bamboo forest in Arashiyama",
        meta: { camera: "Sony A7IV", lens: "16-35mm f/2.8 GM", focalLength: "20mm", aperture: "f/5.6", shutterSpeed: "1/60s", iso: "400", location: "Arashiyama, Kyoto" },
        myFav: true,
      },
    ],
  },
  {
    slug: "iceland",
    country: "Iceland",
    coverImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80",
    description: "Glaciers, waterfalls, and the Northern Lights",
    date: "November 2024",
    photoCount: 6,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
        alt: "Northern Lights over Iceland",
        meta: { camera: "Nikon Z8", lens: "14-24mm f/2.8 S", focalLength: "14mm", aperture: "f/2.8", shutterSpeed: "15s", iso: "3200", location: "Vik, South Iceland" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=800&q=80",
        alt: "Gullfoss waterfall",
        meta: { camera: "Nikon Z8", lens: "24-70mm f/2.8 S", focalLength: "28mm", aperture: "f/11", shutterSpeed: "1/4s", iso: "100", location: "Gullfoss, Golden Circle" },
      },
      {
        src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
        alt: "Black sand beach",
        meta: { camera: "Nikon Z8", lens: "14-24mm f/2.8 S", focalLength: "18mm", aperture: "f/8", shutterSpeed: "1/2s", iso: "100", location: "Reynisfjara, South Iceland" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1509225770129-c60c8b0b6fcc?w=800&q=80",
        alt: "Icelandic highlands",
        meta: { camera: "Nikon Z8", lens: "24-70mm f/2.8 S", focalLength: "35mm", aperture: "f/8", shutterSpeed: "1/250s", iso: "200", location: "Landmannalaugar, Highlands" },
      },
      {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        alt: "Misty mountain landscape",
        meta: { camera: "Nikon Z8", lens: "70-200mm f/2.8 S", focalLength: "100mm", aperture: "f/5.6", shutterSpeed: "1/125s", iso: "400", location: "Snæfellsnes Peninsula" },
      },
      {
        src: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&q=80",
        alt: "Glacier lagoon",
        meta: { camera: "Nikon Z8", lens: "24-70mm f/2.8 S", focalLength: "40mm", aperture: "f/8", shutterSpeed: "1/160s", iso: "100", location: "Jökulsárlón, East Iceland" },
      },
    ],
  },
  {
    slug: "italy",
    country: "Italy",
    coverImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
    description: "Renaissance art, coastal villages, and incredible food",
    date: "June 2024",
    photoCount: 7,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
        alt: "Venice canal",
        meta: { camera: "Fujifilm X-T5", lens: "16-55mm f/2.8", focalLength: "23mm", aperture: "f/5.6", shutterSpeed: "1/320s", iso: "160", location: "Grand Canal, Venice" },
      },
      {
        src: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&q=80",
        alt: "Amalfi Coast",
        meta: { camera: "Fujifilm X-T5", lens: "16-55mm f/2.8", focalLength: "16mm", aperture: "f/8", shutterSpeed: "1/500s", iso: "100", location: "Positano, Amalfi Coast" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80",
        alt: "Cinque Terre colorful houses",
        meta: { camera: "Fujifilm X-T5", lens: "56mm f/1.2", focalLength: "56mm", aperture: "f/4", shutterSpeed: "1/400s", iso: "100", location: "Manarola, Cinque Terre" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
        alt: "Rome Colosseum",
        meta: { camera: "Fujifilm X-T5", lens: "10-24mm f/4", focalLength: "10mm", aperture: "f/8", shutterSpeed: "1/250s", iso: "200", location: "Colosseum, Rome" },
      },
      {
        src: "https://images.unsplash.com/photo-1543429776-2782f8f3cbe3?w=800&q=80",
        alt: "Tuscan countryside",
        meta: { camera: "Fujifilm X-T5", lens: "50-140mm f/2.8", focalLength: "90mm", aperture: "f/5.6", shutterSpeed: "1/640s", iso: "100", location: "Val d'Orcia, Tuscany" },
      },
      {
        src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
        alt: "Florence Duomo",
        meta: { camera: "Fujifilm X-T5", lens: "16-55mm f/2.8", focalLength: "20mm", aperture: "f/7.1", shutterSpeed: "1/320s", iso: "100", location: "Piazzale Michelangelo, Florence" },
      },
      {
        src: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=800&q=80",
        alt: "Italian alleyway",
        meta: { camera: "Fujifilm X-T5", lens: "35mm f/1.4", focalLength: "35mm", aperture: "f/2", shutterSpeed: "1/125s", iso: "800", location: "Trastevere, Rome" },
      },
    ],
  },
  {
    slug: "morocco",
    country: "Morocco",
    coverImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80",
    description: "Vibrant souks, desert dunes, and ancient medinas",
    date: "February 2024",
    photoCount: 6,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
        alt: "Marrakech market",
        meta: { camera: "Canon R6 II", lens: "24-105mm f/4 L", focalLength: "35mm", aperture: "f/4", shutterSpeed: "1/200s", iso: "400", location: "Jemaa el-Fnaa, Marrakech" },
      },
      {
        src: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80",
        alt: "Sahara desert dunes",
        meta: { camera: "Canon R6 II", lens: "70-200mm f/2.8 L", focalLength: "120mm", aperture: "f/8", shutterSpeed: "1/800s", iso: "100", location: "Erg Chebbi, Merzouga" },
        myFav: true,
      },

      {
        src: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&q=80",
        alt: "Moroccan tiles",
        meta: { camera: "Canon R6 II", lens: "50mm f/1.8", focalLength: "50mm", aperture: "f/2.8", shutterSpeed: "1/125s", iso: "800", location: "Ben Youssef Madrasa, Marrakech" },
      },
      {
        src: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&q=80",
        alt: "Atlas Mountains",
        meta: { camera: "Canon R6 II", lens: "24-105mm f/4 L", focalLength: "45mm", aperture: "f/8", shutterSpeed: "1/400s", iso: "100", location: "Imlil, Atlas Mountains" },
      },
      {
        src: "https://images.unsplash.com/photo-1558271736-cd043ef2e855?w=800&q=80",
        alt: "Fez tanneries",
        meta: { camera: "Canon R6 II", lens: "24-105mm f/4 L", focalLength: "70mm", aperture: "f/5.6", shutterSpeed: "1/250s", iso: "200", location: "Chouara Tannery, Fez" },
      },
    ],
  },
  {
    slug: "new-zealand",
    country: "New Zealand",
    coverImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80",
    description: "Dramatic fjords, rolling hills, and adventure sports",
    date: "January 2024",
    photoCount: 6,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80",
        alt: "Milford Sound",
        meta: { camera: "Sony A7RV", lens: "16-35mm f/2.8 GM", focalLength: "16mm", aperture: "f/8", shutterSpeed: "1/250s", iso: "100", location: "Milford Sound, Fiordland" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
        alt: "Lake Tekapo",
        meta: { camera: "Sony A7RV", lens: "24-70mm f/2.8 GM", focalLength: "24mm", aperture: "f/11", shutterSpeed: "1/200s", iso: "100", location: "Church of the Good Shepherd, Tekapo" },
      },
      {
        src: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&q=80",
        alt: "Tongariro Alpine Crossing",
        meta: { camera: "Sony A7RV", lens: "24-70mm f/2.8 GM", focalLength: "35mm", aperture: "f/8", shutterSpeed: "1/500s", iso: "100", location: "Emerald Lakes, Tongariro" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?w=800&q=80",
        alt: "Hobbiton",
        meta: { camera: "Sony A7RV", lens: "35mm f/1.4 GM", focalLength: "35mm", aperture: "f/2.8", shutterSpeed: "1/320s", iso: "100", location: "Hobbiton, Matamata" },
      },
      {
        src: "https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?w=800&q=80",
        alt: "Queenstown mountains",
        meta: { camera: "Sony A7RV", lens: "70-200mm f/2.8 GM", focalLength: "150mm", aperture: "f/5.6", shutterSpeed: "1/640s", iso: "100", location: "The Remarkables, Queenstown" },
      },
      {
        src: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
        alt: "New Zealand fjord",
        meta: { camera: "Sony A7RV", lens: "16-35mm f/2.8 GM", focalLength: "20mm", aperture: "f/8", shutterSpeed: "1/125s", iso: "200", location: "Doubtful Sound, Fiordland" },
      },
    ],
  },
  {
    slug: "norway",
    country: "Norway",
    coverImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80",
    description: "Fjords, midnight sun, and cozy Scandinavian vibes",
    date: "August 2023",
    photoCount: 5,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
        alt: "Norwegian fjord",
        meta: { camera: "Leica Q3", lens: "28mm f/1.7", focalLength: "28mm", aperture: "f/5.6", shutterSpeed: "1/320s", iso: "100", location: "Geirangerfjord, Møre og Romsdal" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        alt: "Aurora borealis",
        meta: { camera: "Leica Q3", lens: "28mm f/1.7", focalLength: "28mm", aperture: "f/1.7", shutterSpeed: "20s", iso: "6400", location: "Tromsø, Northern Norway" },
      },
      {
        src: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&q=80",
        alt: "Lofoten Islands",
        meta: { camera: "Leica Q3", lens: "28mm f/1.7", focalLength: "28mm", aperture: "f/8", shutterSpeed: "1/160s", iso: "100", location: "Reine, Lofoten Islands" },
        myFav: true,
      },
      {
        src: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800&q=80",
        alt: "Bergen colorful houses",
        meta: { camera: "Leica Q3", lens: "28mm f/1.7", focalLength: "28mm", aperture: "f/4", shutterSpeed: "1/250s", iso: "200", location: "Bryggen, Bergen" },
      },
      {
        src: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800&q=80",
        alt: "Trolltunga rock",
        meta: { camera: "Leica Q3", lens: "28mm f/1.7", focalLength: "28mm", aperture: "f/8", shutterSpeed: "1/500s", iso: "100", location: "Trolltunga, Odda" },
      },
    ],
  },
];
