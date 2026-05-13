import { useState, useRef, useEffect, type CSSProperties } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Lazy-loading image with Dark Luxury shimmer placeholder and fade-in.
 * Uses IntersectionObserver with 300px rootMargin for early loading.
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  sizes,
  priority = false,
  width,
  height,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={ref}
      className={`img-reveal ${loaded ? "is-loaded" : ""} ${className}`}
      style={style}
    >
      <div className="img-reveal-placeholder" aria-hidden />
      {inView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`img-reveal-el ${imgClassName}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
