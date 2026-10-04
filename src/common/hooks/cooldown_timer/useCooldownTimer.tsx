import { useEffect, useState } from "react";

export function useCooldownTimer(duration: number) {
  const [remaining, setRemaining] = useState(duration);
  const [endsAt, setEndsAt] = useState(() => Date.now() + duration * 1000);

  useEffect(() => {
    const updateRemaining = () => {
      setRemaining(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
    };
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(timer);
  }, [endsAt]);

  const restart = () => {
    setRemaining(duration);
    setEndsAt(Date.now() + duration * 1000);
  };

  return {
    remaining,
    restart,
    isActive: remaining > 0,
  };
}
