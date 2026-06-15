import { useState, useEffect } from "react";
import { constants } from "../constants";
import type { ErrorResponse } from "../interface";
import { isValidUrl } from "../utils/urlValidation";

export default function Shortern() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: number;

    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            setError(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError({ message: "Please enter a URL" });
      setShortUrl("");
      setOriginalUrl("");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError({ message: "Invalid URL. Please enter a valid URL" });
      setShortUrl("");
      setOriginalUrl("");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCountdown(null);

    try {
      const response = await fetch(`${constants.API_BASE_URL}/short-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      const res = await response.json();

      if (response.ok) {
        setShortUrl(res.data);
        setOriginalUrl(trimmedUrl);
        setUrl("");
        console.log("data from server", res);
      } else {
        const secondsRemaining = res.data?.secondsRemaining;
        setError({
          message: res.message || "Something went wrong",
          data: res.data,
          status: res.status,
          success: res.success,
        });

        if (
          secondsRemaining &&
          (res.message?.includes("Rate limit") ||
            res.message?.includes("Too Many Requests"))
        ) {
          setCountdown(secondsRemaining);
        }
        setShortUrl("");
        setOriginalUrl("");
      }
    } catch (err) {
      console.error("Error:", err);
      setError({
        message: "Failed to connect to server. Please check your connection.",
      });
      setShortUrl("");
      setOriginalUrl("");
    } finally {
      setIsLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="font-heading-lg text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase max-w-2xl text-white select-none">
        SHORTEN. TRACK. ANALYZE.
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Url input section */}
        <div className="relative border-2 border-white bg-transparent flex flex-col md:flex-row items-stretch">
          <input
            id="url-input"
            type="text"
            required
            placeholder="PASTE YOUR LONG URL HERE..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="w-full bg-transparent p-6 font-mono text-[15px] text-white placeholder-zinc-600 focus:outline-none border-b-2 md:border-b-0 border-white md:border-r-0 uppercase disabled:opacity-50"
          />
          <button
            id="shorten-submit-btn"
            type="submit"
            disabled={!url || isLoading || countdown !== null}
            className="px-10 font-bold text-xs tracking-widest animate-pulse transition-all uppercase flex items-center justify-center min-h-16 md:min-h-auto bg-zinc-700 text-zinc-200 hover:bg-zinc-300 active:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "SHORTENING..."
              : countdown !== null
                ? "LOADING..."
                : "SHORTEN"}
          </button>
        </div>
      </form>

      {/* Generated Link Result Section */}
      {shortUrl && originalUrl && !error && (
        <div
          className="bg-[#292524] p-6 border-l-4 border-white flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in"
          id="generated-link-card"
        >
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="font-sans text-[10px] tracking-widest text-zinc-400 font-extrabold select-none">
              GENERATED LINK
            </span>
            <div className="flex items-baseline gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-2xl md:text-3xl font-bold text-white hover:text-zinc-300 transition-colors selection:bg-white selection:text-black break-all"
              >
                {shortUrl}
              </a>
            </div>
            <p className="font-mono text-[11px] text-zinc-500 truncate max-w-full selection:bg-white selection:text-black mt-1">
              {originalUrl}
            </p>
          </div>
          <button
            onClick={() => {
              copyLink();
            }}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs tracking-wider uppercase transition-colors"
          >
            COPY
          </button>
        </div>
      )}

      {/* Error section */}
      {error && (
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
              {error.message}
            </div>
            {countdown !== null && (
              <div className="font-mono text-sm md:text-base font-bold select-none text-white">
                {countdown}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
