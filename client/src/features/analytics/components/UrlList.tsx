import getUrls from "../api/getUrlsApi";
import { useEffect, useState } from "react";
import type { UrlItem, UrlResponse } from "../interface";
import type { ApiResponse } from "../../../interface";
import { constants } from "../../../constants";

const UrlList = () => {
  const [links, setLinks] = useState<UrlItem[]>([]);
  const [selectedLink, setSelectedLink] = useState<UrlItem | null>(null);
  const [error, setError] = useState<ApiResponse<UrlResponse | null> | null>(
    null,
  );
  const [totalLinks, setTotalLinks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUrlList = async () => {
    setIsLoading(true);
    try {
      const res = await getUrls();
      console.log("data from children", res);

      if (res.success && res.data && res.data.total) {
        console.log("childern", res.data.data);
        setLinks(res.data.data);
        setTotalLinks(res.data.total);
        setError(null);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
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

  const handleLinkClick = (link: UrlItem) => {
    console.log("lol", link);
    setSelectedLink(link);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchUrlList();
    });
  }, []);

  return (
    <aside className="relative w-full md:w-1/3 md:fixed md:left-0 md:top-16 md:h-[calc(100vh-64px)] bg-[#fbfbfa] border-r border-[#E7E5E4]">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 p-4 border-b border-black bg-white flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black">
            ALL REGISTERED LINKS
          </h4>
          <div className="flex items-center gap-4">
            <div>{totalLinks}</div>
            <button className="custombutton" onClick={() => fetchUrlList()}>
              Refresh
            </button>
          </div>
        </div>

        {/* aside Links list */}
        <div className="flex-1 overflow-y-auto pb-28">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-xs uppercase text-stone-500 font-medium">
                Loading links...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-xs uppercase text-stone-500 font-medium">
                {error.message}
              </p>
            </div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs uppercase text-stone-500 font-medium">
                No URL redirections saved yet.
              </p>
            </div>
          ) : (
            // ✅ Fixed: Removed the breaking wrapper parentheses and curly braces around links.map
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
            )) // ✅ Fixed matching bracket closing
          )}
        </div>
      </div>
    </aside>
  );
};

export default UrlList;
