import { useEffect, useState } from "react";

/** Returns the active layout tier so components can pick sizes in JS. */
export function useBreakpoint(): "mobile" | "tablet" | "desktop" {
  const [tier, setTier] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setTier(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return tier;
}
