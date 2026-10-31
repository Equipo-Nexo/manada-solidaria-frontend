import { useRef } from "react";
import type { PointerEvent } from "react";

type UseDoubleTapProps = {
  onDoubleTap: (event: PointerEvent<HTMLElement>) => void;
  delay?: number;
};

export function useDoubleTap({ onDoubleTap, delay = 300 }: UseDoubleTapProps) {
  const lastTapRef = useRef(0);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;

    if (event.target instanceof Element && event.target.closest("button, a")) {
      lastTapRef.current = 0;
      lastPositionRef.current = null;
      return;
    }

    const now = Date.now();
    const position = {
      x: event.clientX,
      y: event.clientY,
    };

    const timeBetweenTaps = now - lastTapRef.current;
    const previousPosition = lastPositionRef.current;

    const isNearPreviousTap =
      previousPosition !== null &&
      Math.hypot(
        position.x - previousPosition.x,
        position.y - previousPosition.y,
      ) < 30;

    if (timeBetweenTaps > 0 && timeBetweenTaps <= delay && isNearPreviousTap) {
      lastTapRef.current = 0;
      lastPositionRef.current = null;
      onDoubleTap(event);
    } else {
      lastTapRef.current = now;
      lastPositionRef.current = position;
    }
  };

  const resetTap = () => {
    lastTapRef.current = 0;
    lastPositionRef.current = null;
  };

  return {
    onPointerUp: handlePointerUp,
    onPointerCancel: resetTap,
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "touch") return;
      const previousPosition = lastPositionRef.current;
      if (
        previousPosition &&
        Math.hypot(
          event.clientX - previousPosition.x,
          event.clientY - previousPosition.y,
        ) > 30
      ) {
        resetTap();
      }
    },
  };
}
