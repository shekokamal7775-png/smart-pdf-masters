import { useEffect, useRef } from "react";

export default function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    (window as any).atOptions = {
      key: "14073f3bdf018284d50e40b238db439c",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highrevenueformat.com/14073f3bdf018284d50e40b238db439c/invoke.js";
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
      <div ref={containerRef} style={{ width: 300, height: 250 }} />
    </div>
  );
}
