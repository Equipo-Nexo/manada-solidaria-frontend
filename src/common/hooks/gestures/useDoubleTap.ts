import { useRef } from "react";
import type { PointerEvent } from "react";

type UseDoubleTapProps = {
  onDoubleTap: (event: PointerEvent<HTMLElement>) => void;
  delay?: number;
  maxDistance?: number;
  maxMovement?: number;
  maxTapDuration?: number;
};

export function useDoubleTap({
  onDoubleTap,
  delay = 300,
  maxDistance = 30,
  maxMovement = 10,
  maxTapDuration = 300,
}: UseDoubleTapProps) {
  const lastTapRef = useRef(0);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);
  const activeTapRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    startedAt: number;
  } | null>(null);

  const resetTap = () => {
    lastTapRef.current = 0;
    lastPositionRef.current = null;
    activeTapRef.current = null;
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    if (
      !event.isPrimary ||
      (event.target instanceof Element && event.target.closest("button, a"))
    ) {
      resetTap();
      return;
    }
    activeTapRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startedAt: event.timeStamp,
    };
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;

    const activeTap = activeTapRef.current;
    if (
      !activeTap ||
      activeTap.pointerId !== event.pointerId ||
      !event.isPrimary ||
      event.timeStamp - activeTap.startedAt > maxTapDuration ||
      Math.hypot(event.clientX - activeTap.x, event.clientY - activeTap.y) >
        maxMovement ||
      (event.target instanceof Element && event.target.closest("button, a"))
    ) {
      resetTap();
      return;
    }
    activeTapRef.current = null;

    const now = event.timeStamp;
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
      ) <= maxDistance;

    if (timeBetweenTaps > 0 && timeBetweenTaps <= delay && isNearPreviousTap) {
      resetTap();
      onDoubleTap(event);
    } else {
      lastTapRef.current = now;
      lastPositionRef.current = position;
    }
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: resetTap,
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "touch") return;
      const activeTap = activeTapRef.current;
      if (
        activeTap &&
        activeTap.pointerId === event.pointerId &&
        Math.hypot(
          event.clientX - activeTap.x,
          event.clientY - activeTap.y,
        ) > maxMovement
      ) {
        resetTap();
      }
    },
  };
}
