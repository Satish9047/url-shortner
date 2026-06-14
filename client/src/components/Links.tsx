// const LinksAside = () => {
//   const links = [
//     {
//       code: "satees",
//       originalUrl: "https://satishprajapati123.com.np",
//       title: "My Personal Portfolio Website",
//       totalClicks: 123,
//     },
//     {
//       code: "satees34",
//       originalUrl: "https://satishprajapati.com.np",
//       title: "My Personal Portfolio Website",
//       totalClicks: 143,
//     },
//   ];

//   const loadingLinks = [
//     {
//       code: "satees",
//       originalUrl: "https://satishprajapati123.com.np",
//       title: "My Personal Portfolio Website",
//       totalClicks: 123,
//     },
//     {
//       code: "satee74",
//       originalUrl: "https://satishprajapati.com.np",
//       title: "My Personal Portfolio Website",
//       totalClicks: 143,
//     },
//   ];
//   return (
//     <div>
//       {/* Sidebar "ALL LINKS" */}
//       <aside className="w-full md:w-[33.33%] md:h-[calc(100vh-64px)] md:fixed md:left-0 bg-[#fbfbfa] border-r border-[#E7E5E4] flex flex-col justify-between overflow-y-auto">
//         <div>
//           <div className="p-4 border-b border-black flex justify-between items-center bg-white">
//             <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black">
//               ALL REGISTERED LINKS 23
//             </h4>
//             <button
//               title="Refresh listing"
//               className="p-1 hover:bg-[#eaeaea] text-black transition-colors"
//             ></button>
//           </div>

//           {/* Listing Items */}
//           <div className="flex flex-col divide-y divide-[#E7E5E4]">
//             {loadingLinks ? (
//               <div className="p-8 text-center font-mono text-xs text-brand-text-muted uppercase">
//                 Compiling redirect database...
//               </div>
//             ) : links.length === 0 ? (
//               <div className="p-8 text-center font-mono text-xs text-brand-text-muted uppercase">
//                 No URL redirections saved yet.
//               </div>
//             ) : (
//               links.map((link) => {
//                 return (
//                   <div
//                     key={link.code}
//                     className={`p-4 transition-all cursor-pointer group flex flex-col justify-between "bg-white border-l-transparent border-b border-[#E7E5E4] hover:bg-white border-l-[4px] border-l-transparent`}
//                   >
//                     <div className="flex justify-between items-start gap-4 mb-2">
//                       <span
//                         className={`font-mono text-sm font-bold text-black underline`}
//                       >
//                         grps.r/{link.code}
//                       </span>
//                       <span className="font-sans text-xl font-extrabold text-black leading-none">
//                         {link.totalClicks?.toLocaleString() || 0}
//                       </span>
//                     </div>
//                     {link.title && (
//                       <p className="font-sans text-[10px] text-brand-text-muted uppercase font-bold truncate max-w-65 tracking-tight mb-1">
//                         {link.title}
//                       </p>
//                     )}
//                     <p className="font-mono text-[9px] text-[#848484] uppercase truncate max-w-75">
//                       {link.originalUrl}
//                     </p>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Sidebar create new link CTA Bottom Row */}
//         <div
//           className="mt-8 md:mt-auto p-4 border-t border-black bg-black text-white flex items-center justify-between cursor-pointer hover:bg-indigo-950 transition-colors select-none group sticky bottom-0"
//         >
//           <span className="font-sans text-xs font-bold tracking-widest uppercase">
//             CREATE NEW LINK
//           </span>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default LinksAside;
