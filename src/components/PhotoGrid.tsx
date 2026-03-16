import PhotoImage from "@/components/PhotoImage";
import MarqueeText from "@/components/MarqueeText";
import { Camera } from "lucide-react";
import { motion } from "@/components/MotionWrapper";
import type { Photo } from "@/data/photography";

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="columns-2 lg:columns-3 gap-3 space-y-3">
      {photos.map((photo, index) => {
        const aspect = photo.width && photo.height ? `${photo.width}/${photo.height}` : "4/3";
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5) }}
            onClick={() => onPhotoClick(index)}
            className="w-full break-inside-avoid rounded overflow-hidden border border-border hover:border-primary/40 transition-colors duration-300 group cursor-pointer block"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
              <motion.div
                className="w-full h-full"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <PhotoImage src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" aspectHint={aspect} />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                <div className="flex items-center gap-1.5">
                  {photo.meta?.camera && (
                    <>
                      <Camera size={10} className="text-white/70 drop-shadow-lg flex-shrink-0" />
                      <span className="text-white/70 text-xs drop-shadow-lg">{photo.meta.camera}</span>
                    </>
                  )}
                </div>
                <span className="text-white text-sm font-medium drop-shadow-lg hidden lg:block">{photo.alt}</span>
                <div className="block lg:hidden min-w-0">
                  <MarqueeText text={photo.alt} className="text-white text-xs font-medium drop-shadow-lg" />
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
