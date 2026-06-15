import { useState, useEffect } from "react";
import { constants } from "../../constants";
import type { Link, ClickData } from "../../interface";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Analytical = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [analyticsData, setAnalyticsData] = useState<ClickData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const ITEMS_PER_PAGE = constants.NUMBER_OF_LINKS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const linkItems = Array.isArray(links) ? links : [];

  // Fetch paginated links from the server and keep pagination state in sync.
  async function fetchAllLinks(page = 1) {
    setIsLoadingLinks(true);
    setError(null);
    try {
      const response = await fetch(
        `${constants.API_BASE_URL}/urls?page=${page}&limit=${ITEMS_PER_PAGE}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const res = await response.json();
      console.log("All links:", res);

      if (response.ok) {
        const payload = res.data;
        const fetchedLinks = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        setLinks(fetchedLinks);
        setCurrentPage(page);

        const total =
          typeof payload?.total === "number"
            ? payload.total
            : fetchedLinks.length;

        const pages =
          typeof payload?.totalPages === "number"
            ? payload.totalPages
            : Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

        setTotalLinks(total);
        setTotalPages(pages);
      } else {
        setError(res.message || "Failed to fetch links");
      }
    } catch (error) {
      console.error("Error fetching links:", error);
      setError("Failed to connect to server");
      setLinks([]);
      setTotalLinks(0);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setIsLoadingLinks(false);
    }
  }

  // Ensure current page stays in range when the total page count changes
  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchAllLinks(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchAllLinks(currentPage - 1);
    }
  };
  // Fetch analytics data for specific link
  async function fetchLinkAnalyticsData(code: string) {
    setIsLoadingAnalytics(true);
    setError(null);
    try {
      const url = `${constants.API_BASE_URL}/analytics/${code}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  // Fetch links on component mount
  useEffect(() => {
    window.setTimeout(() => {
      fetchAllLinks();
    }, 0);
  }, []);

  // Select a link and fetch 
  const handleLinkClick = (link: Link) => {
    setSelectedLink(link);
    fetchLinkAnalyticsData(link.shortCode);
  };

  // Calculate total clicks from analytics data
  const getTotalClicks = () => {
    return analyticsData.reduce((total, item) => total + item.clickCount, 0);
  };

  //filling missing days with 0
  const getChartData = () => {
    const last7Days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      last7Days.push(dateString);
    }

    const dataMap = new Map<string, number>();
    analyticsData.forEach((item) => {
      const formattedDate = item.date.split("T")[0];
      dataMap.set(formattedDate, item.clickCount);
    });

    const clickCounts = last7Days.map((date) => dataMap.get(date) || 0);

    //Format dates for cleaner UI labels on the chart's X-axis
    const labels = last7Days.map((dateStr) => {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    });

    return {
      labels,
      datasets: [
        {
          label: "Clicks",
          data: clickCounts,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          tension: 0.3,
          pointBackgroundColor: "rgb(0, 0, 0)",
          pointBorderColor: "rgb(0, 0, 0)",
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of clicks",
          font: {
            size: 12,
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen pt-16 bg-white">
      <div className="w-full flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="relative w-full md:w-1/3 md:fixed md:left-0 md:top-16 md:h-[calc(100vh-64px)] bg-[#fbfbfa] border-r border-[#E7E5E4]">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 p-4 border-b border-black bg-white flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                ALL REGISTERED LINKS
              </h4>
              <div className="flex items-center gap-4">
                <div>{totalLinks}</div>
                <button
                  className="custombutton"
                  onClick={() => fetchAllLinks()}
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* aside Links list */}
            <div className="flex-1 overflow-y-auto pb-28">
              {isLoadingLinks ? (
                <div className="p-8 text-center">
                  <p className="text-xs uppercase text-stone-500 font-medium">
                    Loading links...
                  </p>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-xs uppercase text-stone-500 font-medium">
                    {error}
                  </p>
                </div>
              ) : linkItems.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-xs uppercase text-stone-500 font-medium">
                    No URL redirections saved yet.
                  </p>
                </div>
              ) : (
                linkItems.map((link) => (
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

            {linkItems.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-[#E7E5E4] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs uppercase tracking-wider text-stone-500">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="custombutton disabled:opacity-40"
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      className="custombutton disabled:opacity-40"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
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
                <div className="flex items-center gap-4 shrink-0">
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

              {/* Analytics Time Period Filters */}
              <div className="flex items-center gap-4 mb-4">
                <p className="custombutton">Last 7 days</p>
              </div>

              {/* Chart */}
              <div className="border border-[#E7E5E4] p-4">
                {isLoadingAnalytics ? (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-sm uppercase text-stone-400">
                      Loading analytics...
                    </p>
                  </div>
                ) : analyticsData.length === 0 ? (
                  // Note: Since getChartData generates placeholder zeros now,
                  // analyticsData.length === 0 will only trigger if the API explicitly returns an empty array.
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-sm uppercase text-stone-400">
                      No click data available for the selected period
                    </p>
                  </div>
                ) : (
                  <div className="h-64 w-full">
                    <Line data={getChartData()} options={chartOptions} />
                  </div>
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
