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
import type { analyticsDataProps } from "../interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ analyticsData }: analyticsDataProps) => {
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

  const chartConfig = {
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
    <div className="border border-[#E7E5E4] p-4">
      {analyticsData.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm uppercase text-stone-400">
            No click data available for the selected period
          </p>
        </div>
      ) : (
        <div className="h-64 w-full">
          <Line data={getChartData()} options={chartConfig} />
        </div>
      )}
    </div>
  );
};

export default Chart;
