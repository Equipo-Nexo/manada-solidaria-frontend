import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const handler = (event: Event) => {
        event.preventDefault();

        setDeferredPrompt(event as BeforeInstallPromptEvent);

        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 6000);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();

        const choice = await deferredPrompt.userChoice;

        console.log("Install choice:", choice.outcome);

        setDeferredPrompt(null);
        setVisible(false);
    };

  if (!deferredPrompt) return null;

  return (
    <button
      onClick={installApp}
      className={`
        fixed bottom-36 left-1/2 z-50
        -translate-x-1/2
        rounded-full bg-primary px-15 py-3
        text-base-100 shadow-lg
        transition-all duration-500 ease-out
        text-medium
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }
      `}
    >
      Instalar app
    </button>
  );
};