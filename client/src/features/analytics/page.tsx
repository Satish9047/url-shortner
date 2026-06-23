import UrlList from "./components/UrlList";
import AnalyticDashboard from "./components/AnalyticDashboard";
import { useState } from "react";
import type { UrlItem } from "./interface";

const Analytical = () => {
  const [selectedLink, setSelectedLink] = useState<UrlItem | null>(null);

  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
        {/* Sidebar */}
        <UrlList
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
        />

        {/* Right Panel */}
        <AnalyticDashboard selectedLink={selectedLink} />
      </div>
    </main>
  );
};

export default Analytical;
