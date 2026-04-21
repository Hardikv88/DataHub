import { useEffect, useState } from "react";

type Props = {
  end: number;
  duration?: number;
};

export default function CountUpNumber({ end, duration = 1500 }: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setValue(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{value.toLocaleString()}</span>;
}