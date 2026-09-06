import { useEffect, useRef } from "react";

export default function SkyscraperAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    (window as any).atOptions = {
      key: "802fba723aec5ba6583da359fb4b7ebe",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highrevenueformat.com/802fba723aec5ba6583da359fb4b7ebe/invoke.js";
    script.async = true;

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
    <div className="flex justify-center py-4">
      <div ref={containerRef} style={{ width: 160, height: 600 }} />
    </div>
  );
}
