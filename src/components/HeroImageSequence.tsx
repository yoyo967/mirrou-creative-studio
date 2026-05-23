import { useState, useEffect } from "react";
import { motion } from "motion/react";

const IMAGES = [
  "/heroimages/228ba3d7-ccd6-4892-9673-232da4aeedc2.png",
  "/heroimages/2f30a24e-b531-442d-abe0-fef1d11c904d.png",
  "/heroimages/332f49f7-c365-424c-aa94-45bdd51b2602.png",
  "/heroimages/357c3a9f-9655-46a0-9eff-2f89070827f3.png",
  "/heroimages/4213332d-5a76-42e9-9d9e-fb161fd5cb65.png",
  "/heroimages/431bccad-f6cd-45a1-b915-211e8c1b23c7.png",
  "/heroimages/58461b21-feea-4c50-a8ed-50ab1104d1af.png",
  "/heroimages/8ede298b-d65d-437a-8e16-8d36e3bec78c.png",
  "/heroimages/b9b33207-dbba-4a2d-9635-2297c35c7ef2.png",
  "/heroimages/c5cf5fb8-ffb6-41bd-8096-6f3d16350443.png",
  "/heroimages/c6631350-2d2d-49e7-a7ac-859df39864ff.png",
  "/heroimages/cc3aaba3-15a0-4539-ac1a-d18160893fae.png",
  "/heroimages/cd09f6f9-3139-4581-8d54-9bd9f9cd627d.png",
  "/heroimages/ce252914-d083-49a4-bdd8-b0ac73aa3e63.png",
  "/heroimages/d1c2e1fd-5a6d-4818-a116-9431f4609339.png",
  "/heroimages/d4abad19-4fdd-4afd-a606-114f0e621c71.png",
  "/heroimages/deb2fe8c-d03a-466f-afe0-782034499217.png",
  "/heroimages/e1946d7f-66b7-4ac3-b8d1-61c212d5e659.png",
  "/heroimages/f1bf505e-b766-443e-b783-afe8d5540f90.png",
  "/heroimages/fa1735ef-0952-4bdb-95d6-37a639e2f976.png"
];

const PRELOAD_COUNT = 3;

export default function HeroImageSequence({ className = "" }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload initial images
  useEffect(() => {
    IMAGES.slice(0, PRELOAD_COUNT).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Preload the next image automatically
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % IMAGES.length;
    const img = new Image();
    img.src = IMAGES[nextIndex];
  }, [currentIndex]);

  // Handle the automatic slideshow cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000); // 3 seconds per image

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {IMAGES.map((src, idx) => (
        <motion.img
          key={src}
          src={src}
          alt={`Hero visual sequence ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === idx ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
