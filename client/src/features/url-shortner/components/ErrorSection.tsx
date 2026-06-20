import { useEffect, useState } from "react";
import type { ApiResponse } from "../interface";


interface ShortenerApiResponse {
  url: string | null;
  secondsRemaining: number | null;
}

interface ErrorSectionProps {
  errorRes: ApiResponse<ShortenerApiResponse> | null;
}

const ErrorSection = ({ errorRes }: ErrorSectionProps) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!errorRes) {
        setCountdown(null);
        setDisplayMessage(null);
        return;
      }

      setDisplayMessage(errorRes.message);
      if (errorRes.data && typeof errorRes.data === "object" && errorRes.data.secondsRemaining !== null) {
        setCountdown(errorRes.data.secondsRemaining);
      } else {
        setCountdown(null);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [errorRes]);


  useEffect(() => {
    if (!displayMessage || countdown !== null) return;
    const dismissTimer = setTimeout(() => {
      setDisplayMessage(null);
    }, 2000); 
    return () => clearTimeout(dismissTimer);
  }, [displayMessage, countdown]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          setDisplayMessage(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  if (!displayMessage) return null;

  return (
    <div>
      <div
        className={`${
          countdown !== null ? "bg-[#DC2626] animate-pulse" : "bg-[#DC2626]"
        } text-white p-4 flex items-center justify-between border-l-4 border-white`}
        id="error-banner"
      >
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs md:text-sm font-black tracking-widest text-white uppercase leading-none">
            {countdown !== null ? "RATE LIMIT EXCEEDED" : "ERROR"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-mono text-sm md:text-base font-bold select-none text-white">
            {displayMessage}
          </div>
          {countdown !== null && (
            <div className="font-mono text-sm md:text-base font-bold select-none bg-black/20 px-2 py-1 rounded text-white">
              {countdown}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorSection;