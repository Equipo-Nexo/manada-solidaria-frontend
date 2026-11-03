type FundraisingProgressParams = {
  amountToBeCollected?: number | null;
  amountCollected?: number | null;
  status: string;
};

export function getFundraisingProgress({
  amountToBeCollected,
  amountCollected,
  status,
}: FundraisingProgressParams): number | null {
  if (amountToBeCollected == null || amountToBeCollected <= 0) {
    return null;
  }

  if (status === "COMPLETED") {
    return 100;
  }

  const collected = amountCollected ?? 0;

  return Math.min(
    100,
    Math.max(0, Math.round((collected / amountToBeCollected) * 100)),
  );
}
