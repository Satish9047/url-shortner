import getUrls from "../api/getUrlsApi";
import { useEffect, useState } from "react";
import type { UrlItem, UrlListProps, UrlResponse } from "../interface";
import type { ApiResponse } from "../../../interface";
import { constants } from "../../../constants";

const UrlList = ({ selectedLink, setSelectedLink }: UrlListProps) => {
  const [links, setLinks] = useState<UrlItem[]>([]);
  const [error, setError] = useState<ApiResponse<UrlResponse | null> | null>(
    null,
  );
  const [totalLinks, setTotalLinks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUrlList = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await getUrls(page);
      console.log("data from children", res);

      if (res.success && res.data && res.data.total) {
        console.log("childern", res.data.data);
        setLinks(res.data.data);
        setTotalLinks(res.data.total);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.page);
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

  const handleNext =()=>{
    console.log("clicked")
    if (currentPage < totalPages) {
      fetchUrlList(currentPage + 1);
    }
  }

  const handlePrevious =()=>{
        console.log("clicked")
    if (currentPage > 1) {
      fetchUrlList(currentPage - 1);
    }
  }

  return (
    <aside className="w-full border-r border-[#E7E5E4] bg-[#fbfbfa] md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-[33.333%] md:self-start">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black bg-white p-4">
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
        <div className="flex-1 overflow-y-auto pb-4">
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
            links.map((link) => (
              <div
                key={link.shortCode}
                onClick={() => handleLinkClick(link)}
                className={`cursor-pointer border-b border-[#E7E5E4] border-l-4 p-4 transition-all ${
                  selectedLink?.shortCode === link.shortCode
                    ? "border-l-black bg-stone-50"
                    : "border-l-transparent hover:border-l-black hover:bg-stone-50"
                }`}
              >
                <div className="mb-1 flex items-start justify-between gap-4">
                  <span className="font-mono text-sm font-bold text-black">
                    {constants.SHORT_BASE_URL}/{link.shortCode}
                  </span>
                </div>
                <p className="truncate font-mono text-sm text-stone-400">
                  {link.originalUrl}
                </p>
              </div>
            ))
          )}
        </div>

        {links.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-[#E7E5E4] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs uppercase tracking-wider text-stone-500">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="custombutton disabled:opacity-40"
                      onClick={()=>handlePrevious()}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      className="custombutton disabled:opacity-40"
                      onClick={()=>handleNext()}
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
  );
};

export default UrlList;
