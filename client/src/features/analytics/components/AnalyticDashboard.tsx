import { useEffect, useState } from "react";
import type { AnalyticDashboardProps, ClickData } from "../interface";
import type { ApiResponse } from "../../../interface";
import getUrlData from "../api/getUrlDataApi";
import { constants } from "../../../constants";
import Chart from "./Chart";

const AnalyticDashboard = ({ selectedLink }: AnalyticDashboardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<ClickData[]>([]);
  const [error, setError] = useState<ApiResponse<ClickData[] | null> | null>(
    null,
  );

  const getAnalyticData = async (code: string) => {
    setIsLoading(true);
    try {
      const res = await getUrlData(code);
      if (res.success && res.data) {
        console.log("analytical data", res);
        setAnalyticsData(res.data || []);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      setError({
        status: null,
        message: "Failed to connect to server. Please check your connection.",
        data: null,
        success: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getAnalyticData(selectedLink?.shortCode || "");
    });
  }, [selectedLink?.shortCode]);

  const getTotalClicks = () => {
    return analyticsData.reduce((total, item) => total + item.clickCount, 0);
  };

  return (
    <section className="flex-1 overflow-auto bg-white">
      {selectedLink ? (
        <div className="p-6">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="mb-2 break-all text-2xl font-bold text-black">
              {selectedLink.originalUrl}
            </h2>
            <div className="flex shrink-0 items-center gap-4">
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
                onClick={() => getAnalyticData(selectedLink.shortCode || "")}
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-black p-4 h-25">
              <p className="mb-1 text-xs uppercase tracking-wider text-stone-500">
                Total Clicks
              </p>
              <p className="text-3xl font-bold text-black">
                {isLoading ? "" : getTotalClicks()}
              </p>
            </div>

            <div className="border border-black p-4 h-25">
              <p className="mb-1 text-xs uppercase tracking-wider text-stone-500">
                Short URL
              </p>
              <p className="break-all font-mono text-md text-black">
                {constants.SHORT_BASE_URL}/{selectedLink.shortCode}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 border border-red-200 bg-red-50 p-4 text-red-600">
              <p className="text-sm">{error.message}</p>
            </div>
          )}

          {/* Analytics Time Period Filters */}
          <div className="mb-4 flex items-center gap-4">
            <p className="custombutton">Last 7 days</p>
          </div>

          {/* Chart */}
          <Chart analyticsData={analyticsData} />
          {/* <div className="border border-[#E7E5E4] p-4">
            {isLoadingAnalytics ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-sm uppercase text-stone-400">
                  Loading analytics...
                </p>
              </div>
            ) : analyticsData.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-sm uppercase text-stone-400">
                  No click data available for the selected period
                </p>
              </div>
            ) : (
              <div className="h-64 w-full">
                <Line data={getChartData()} options={chartOptions} />
              </div>
            )}
          </div> */}
        </div>
      ) : (
        <div className="flex h-full min-h-[calc(100vh-8rem)] items-center justify-center">
          <p className="text-sm uppercase tracking-wider text-stone-400">
            Select a link to view analytics
          </p>
        </div>
      )}
    </section>
  );
};

export default AnalyticDashboard;
