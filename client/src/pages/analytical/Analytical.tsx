import { useState, useEffect } from "react";
import { constants } from "../../constants";
import type { Link, ClickData } from "../../interface";

const Analytical = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [analyticsData, setAnalyticsData] = useState<ClickData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all links
  async function fetchAllLinks() {
    setIsLoadingLinks(true);
    setError(null);
    try {
      const response = await fetch(`${constants.API_BASE_URL}/urls`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      console.log("All links:", res);

      if (response.ok) {
        setLinks(res.data || []);
      } else {
        setError(res.message || "Failed to fetch links");
      }
    } catch (error) {
      console.error("Error fetching links:", error);
      setError("Failed to connect to server");
      setLinks([]);
    } finally {
      setIsLoadingLinks(false);
    }
  }

  // Fetch analytics data for specific link
  async function fetchLinkAnalyticsData(code: string, days?: number) {
    setIsLoadingAnalytics(true);
    setError(null);
    try {
      const response = await fetch(
        `${constants.API_BASE_URL}/analytics/${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const res = await response.json();
      console.log("Analytics data:", res);

      if (response.ok) {
        setAnalyticsData(res.data || []);
      } else {
        setError(res.message || "Failed to fetch analytics");
        setAnalyticsData([]);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError("Failed to fetch analytics data");
      setAnalyticsData([]);
    } finally {
      setIsLoadingAnalytics(false);
    }
  }

  // fetch links on component mount
  useEffect(() => {
    fetchAllLinks();
  }, []);

  // select the link
  const handleLinkClick = (link: Link) => {
    setSelectedLink(link);
    fetchLinkAnalyticsData(link.shortCode);
  };

  // calculate total clicks from analytics data
  const getTotalClicks = () => {
    return analyticsData.reduce((total, item) => total + item.clickCount, 0);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen pt-16 bg-white">
      <div className="w-full flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 md:fixed md:left-0 md:top-16 md:h-[calc(100vh-64px)] bg-[#fbfbfa] border-r border-[#E7E5E4] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 p-4 border-b border-black bg-white flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              ALL REGISTERED LINKS
            </h4>
            <div className="flex items-center gap-4">
              <div>{links.length}</div>
              <button className="custombutton" onClick={() => fetchAllLinks()}>
                Refresh
              </button>
            </div>
          </div>

          {/* aside Links list */}
          <div className="flex flex-col">
            {isLoadingLinks ? (
              <div className="p-8 text-center">
                <p className="text-xs uppercase text-stone-500 font-medium">
                  Loading links...
                </p>
              </div>
            ) : links.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-xs uppercase text-stone-500 font-medium">
                  No URL redirections saved yet.
                </p>
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link.shortCode}
                  onClick={() => handleLinkClick(link)}
                  className={`p-4 cursor-pointer border-b border-[#E7E5E4] border-l-4 transition-all ${
                    selectedLink?.shortCode === link.shortCode
                      ? "border-l-black bg-stone-50"
                      : "border-l-transparent hover:border-l-black hover:bg-stone-50"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <span className="font-mono text-sm font-bold text-black">
                      {constants.SHORT_BASE_URL}/{link.shortCode}
                    </span>
                  </div>
                  <p className="font-mono text-sm truncate text-stone-400">
                    {link.originalUrl}
                  </p>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Right Panel */}
        <section className="w-full md:w-2/3 md:ml-[33.333%] bg-white min-h-[calc(100vh-64px)]">
          {selectedLink ? (
            <div className="p-6">
              {/* Header */}
              <div className="mb-8 flex justify-between items-start gap-4">
                <h2 className="text-2xl font-bold text-black mb-2 break-all">
                  {selectedLink.originalUrl}
                </h2>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <a
                    href={selectedLink.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custombutton"
                  >
                    Visit Link
                  </a>
                  <button
                    title="Refresh analytics"
                    className="custombutton"
                    onClick={() =>
                      fetchLinkAnalyticsData(selectedLink.shortCode)
                    }
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="border border-black p-4">
                  <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">
                    Total Clicks
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {isLoadingAnalytics ? "" : getTotalClicks()}
                  </p>
                </div>

                <div className="border border-black p-4">
                  <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">
                    Short URL
                  </p>
                  <p className="font-mono text-sm text-black break-all">
                    {constants.SHORT_BASE_URL}/{selectedLink.shortCode}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-4">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Analytics - Time Period Filters */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  className="custombutton"
                  onClick={() =>
                    fetchLinkAnalyticsData(selectedLink.shortCode, 7)
                  }
                >
                  last 7 days
                </button>
                {/* <button 
                  className="custombutton"
                  onClick={() => fetchLinkAnalyticsData(selectedLink.shortCode, 30)}
                >
                  last 30 days
                </button> */}
              </div>

              {/* Chart */}
              <div className="border border-[#E7E5E4] p-8">
                {isLoadingAnalytics ? (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-sm uppercase text-stone-400">
                      Loading analytics...
                    </p>
                  </div>
                ) : analyticsData.length === 0 ? (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-sm uppercase text-stone-400">
                      No click data available
                    </p>
                  </div>
                ) : (
                  <div className="h-64 flex items-end justify-between gap-2"></div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm uppercase tracking-wider text-stone-400">
                Select a link to view analytics
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Analytical;
