import React, { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 11 }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    setShown("");
    const iv = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return <>{shown}</>;
}
