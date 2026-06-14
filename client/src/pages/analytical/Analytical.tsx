import { constants } from "../../constants";

const Analytical = () => {
  const links = [
    {
      code: "Vg123j",
      originalUrl: "https://satishprajapati123.com.np",
      title: "My Personal Portfolio Website",
      totalClicks: 123,
    },
    {
      code: "kKHu52",
      originalUrl: "https://satishprajapati980.com.np",
      title: "My Personal Portfolio Website",
      totalClicks: 143,
    },
  ];

  const selectedLink = true;

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

              <button
                title="Refresh listing"
                className="custombutton"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            {links.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-xs uppercase text-stone-500 font-medium">
                  No URL redirections saved yet.
                </p>
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link.code}
                  className="p-4 cursor-pointer border-b border-[#E7E5E4] border-l-4 border-l-transparent hover:border-l-black hover:bg-stone-50 transition-all"
                >
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <span className="font-mono text-sm font-bold text-black">
                      {constants.SHORT_BASE_URL}
                      {link.code}
                    </span>

                    <span className="text-xl font-extrabold text-black leading-none">
                      {link.totalClicks.toLocaleString()}
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
                <h2 className="text-2xl font-bold text-black mb-2">
                  {links[0].originalUrl}
                </h2>
                <div className="flex items-center gap-4">
                  <a
                    href={links[0].originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custombutton"
                  >
                    Visit Link
                  </a>
                  <button
                    title="Refresh listing"
                    className="custombutton"
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

                  <p className="text-3xl font-bold text-black">123</p>
                </div>

                <div className="border border-black p-4">
                  <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">
                    Short URL
                  </p>

                  <p className="font-mono text-sm text-black">
                    {constants.SHORT_BASE_URL}
                    {links[0].code}
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center gap-4 mb-4">
                <button className="custombutton">
                  last 7 days
                </button>
                <button className="custombutton">
                  last 30 days
                </button>
              </div>
              <div className="border border-[#E7E5E4] p-8">

                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full bg-black hover:bg-stone-700 transition-colors"
                        style={{ height: `${height}%` }}
                      />

                      <span className="text-[10px] uppercase text-stone-400">
                        {
                          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                            index
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
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
