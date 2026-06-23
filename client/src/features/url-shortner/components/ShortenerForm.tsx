import { useState } from "react";
import ErrorSection from "./ErrorSection";
import { postOriginalUrl } from "../api/urlShortnerApi";
import type { ApiResponse } from "../../../interface";
import type { ShortenerApiResponse } from "../interface";

export default function ShortenerForm() {
  const [infoUrl, setInfoUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<ApiResponse<ShortenerApiResponse> | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await postOriginalUrl(originalUrl);
      if (res.success && res.data.url) {
        setShortUrl(res.data.url);
        setInfoUrl(originalUrl);
      } else if (!res.success && !res.data) {
        setError({
          status: null,
          message: res.message,
          data: {
            url: null,
            secondsRemaining: null,
          },
          success: false,
        });
      } else {
        const secondsRemaining = res.data.secondsRemaining;
        setError(res);
        if (secondsRemaining) {
          setCountdown(secondsRemaining);
        }
        setShortUrl("");
        setOriginalUrl("");
      }
    } catch (err) {
      console.error("Error:", err);
      setError({
        status: null,
        message: "Failed to connect to server. Please check your connection.",
        data: {
          url: null,
          secondsRemaining: null,
        },
        success: false,
      });
    } finally {
      setIsLoading(false);
      setOriginalUrl("");
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
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            disabled={isLoading}
            className="w-full bg-transparent p-6 font-mono text-[15px] text-white placeholder-zinc-600 focus:outline-none border-b-2 md:border-b-0 border-white md:border-r-0 disabled:opacity-50"
          />
          <button
            id="shorten-submit-btn"
            type="submit"
            disabled={!originalUrl || isLoading || countdown !== null}
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
      {shortUrl && (
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
              {infoUrl}
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

      {error && <ErrorSection errorRes={error} />}
    </div>
  );
}
