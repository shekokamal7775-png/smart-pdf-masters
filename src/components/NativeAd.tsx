import { useEffect, useRef } from "react";

export default function NativeAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl31207693.profitableratecpmnetwork.com/d12676eaa34925215a1ae0bae5ad2fed/invoke.js";

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      scriptLoaded.current = false;
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div id="container-d12676eaa34925215a1ae0bae5ad2fed"></div>
    </div>
  );
}
