import { Link, Outlet } from "react-router-dom";

export default function Header() {
  const menus = ["home", "analytic"];

  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-12 w-full fixed top-0 z-50 bg-[#f9f9f9] h-16 border-b border-black">
        <div className="font-sans text-2xl font-black tracking-tighter text-black uppercase cursor-pointer hover:opacity-85 select-none">
          Url Shortener
        </div>

        <nav className="hidden md:flex gap-8 items-center h-full">
          {menus.map((menu) => {
            return (
              <Link
                to={menu === "home" ? "/" : "/analytic"}
                key={menu}
                className={`font-sans text-[12px] font-bold tracking-widest uppercase pb-1 border-b-2 transition-all cursor-pointer text-zinc-500 border-transparent hover:text-black hover:border-black/30`}
              >
                {menu}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <p
            id="header-login-btn"
            className="font-sans text-[11px] font-bold tracking-wider uppercase hover:text-white px-6 py-2 transition-colors duration-200 cursor-pointer"
          >
            .
          </p>
        </div>
      </header>
      <Outlet />
    </>
  );
}
