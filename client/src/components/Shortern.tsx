export default function Shortern() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="font-heading-lg text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase max-w-2xl text-white select-none">
        SHORTEN. TRACK. ANALYZE.
      </h1>
      <form className="flex flex-col gap-4 w-full">
        {/* Main interactive Input element */}
        <div className="relative border-2 border-white bg-transparent flex flex-col md:flex-row items-stretch">
          <input
            id="url-input"
            type="text"
            required
            placeholder="PASTE YOUR LONG URL HERE..."
            className="w-full bg-transparent p-6 font-mono text-[15px] text-white placeholder-zinc-600 focus:outline-none border-b-2 md:border-b-0 border-white md:border-r-0 uppercase"
          />
          <button
            id="shorten-submit-btn"
            type="submit"
            disabled
            className="cursor-not-allowed px-10 font-bold text-xs tracking-widest transition-all uppercase flex items-center justify-center min-h-16 md:min-h-auto bg-zinc-700 text-zinc-400"
          >
            SHORTEN
          </button>
        </div>
      </form>

      {/* Generated Link Result Section */}
      <div
        className="bg-[#292524] p-6 border-l-4 border-white flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in"
        id="generated-link-card"
      >
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="font-sans text-[10px] tracking-widest text-zinc-400 font-extrabold select-none">
            GENERATED LINK
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl md:text-3xl font-bold text-white selection:bg-white selection:text-black">
              short link
            </span>
            <span className="font-mono text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded-none uppercase select-none">
              ACTIVE
            </span>
          </div>
          <p className="font-mono text-[11px] text-zinc-500 truncate max-w-full selection:bg-white selection:text-black mt-1">
            original link
          </p>
        </div>
      </div>
      <div
        className="bg-[#DC2626] text-white p-4 flex items-center justify-between border-l-4 border-white animate-pulse"
        id="rate-limit-exceeded-banner"
      >
        <div className="flex items-center gap-3">
          {/* <AlertTriangle className="w-5 h-5 text-white shrink-0" /> */}
          <span className="font-sans text-xs md:text-sm font-black tracking-widest text-white uppercase leading-none">
            RATE LIMIT EXCEEDED
          </span>
        </div>
        <div className="font-mono text-lg font-bold select-none text-white tracking-widest">
          Retry after 12.00
        </div>
      </div>
    </div>
  );
}
