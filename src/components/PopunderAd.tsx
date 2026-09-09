import { useEffect, useRef } from "react";

export default function PopunderAd() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.src =
      "https://pl31253559.profitableratecpmnetwork.com/eb/cf/c1/ebcfc181a67a09647df8512465d848cc.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      scriptLoaded.current = false;
    };
  }, []);

  return null;
}
