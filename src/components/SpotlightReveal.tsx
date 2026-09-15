import { useEffect, useRef } from 'react';

interface SpotlightRevealProps {
  imageSrc: string;
  videoSrc: string;
  /**
   * Shown under the spotlight when no video is supplied. Defaults to
   * `imageSrc`: using one photograph for both layers is what makes the effect
   * read as a light revealing the scene. Two different photographs produce a
   * visible seam at the mask edge, because the cursor cuts between unrelated
   * framings instead of into the same one.
   */
  revealImageSrc?: string;
  /** CSS filter applied to the covering layer. */
  overlayFilter?: string;
  isPlaying?: boolean;
  baseRadius?: number;
}

export default function SpotlightReveal({
  imageSrc,
  videoSrc,
  revealImageSrc,
  overlayFilter = "grayscale(0.9) brightness(0.3) contrast(1.1)",
  isPlaying = true,
  baseRadius = 420,
}: SpotlightRevealProps) {
  const underlaySrc = revealImageSrc ?? imageSrc;
  const NUM_TRAILS = 6;
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointsRef = useRef(
    Array.from({ length: NUM_TRAILS }, () => ({ x: -1000, y: -1000 }))
  );

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    let targetX = window.innerWidth / 2,
      targetY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Touch devices have no hover: track the finger instead.
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        targetX = touch.clientX;
        targetY = touch.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let animationFrameId: number;
    const animate = () => {
      const points = pointsRef.current;
      points[0].x += (targetX - points[0].x) * 0.2;
      points[0].y += (targetY - points[0].y) * 0.2;
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.35;
        points[i].y += (points[i - 1].y - points[i].y) * 0.35;
      }
      for (let i = 0; i < points.length; i++) {
        const circle = document.getElementById(`trail-${i}`);
        if (circle) {
          circle.setAttribute('cx', points[i].x.toString());
          circle.setAttribute('cy', points[i].y.toString());
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-black pointer-events-none overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        ) : underlaySrc ? (
          <img
            src={underlaySrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // Nothing to reveal yet: fall back to a brand gradient rather than
          // a black rectangle, so the section still reads as designed.
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#e10600_0%,#4a0200_45%,#0a0a0a_100%)]" />
        )}
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="holeGradient">
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="60%" stopColor="black" stopOpacity="0.8" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>

          <mask
            id="spotlight-mask"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <rect width="100%" height="100%" fill="white" />
            {Array.from({ length: NUM_TRAILS })
              .reverse()
              .map((_, reversedIndex) => {
                const i = NUM_TRAILS - 1 - reversedIndex;
                return (
                  <circle
                    key={`trail-${i}`}
                    id={`trail-${i}`}
                    cx={-1000}
                    cy={-1000}
                    r={baseRadius - i * 35}
                    fill="url(#holeGradient)"
                    opacity={1 - i * 0.15}
                  />
                );
              })}
          </mask>
        </defs>

        {imageSrc ? (
          <image
            href={imageSrc}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#spotlight-mask)"
            style={{ filter: overlayFilter }}
          />
        ) : (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#0a0a0a"
            mask="url(#spotlight-mask)"
          />
        )}
      </svg>
    </div>
  );
}
