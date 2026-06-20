import { NavLink, Outlet } from "react-router-dom";

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Analytic",
    path: "/analytic",
  },
];

const Navbar = () => {
  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-12 w-full fixed top-0 z-50 bg-[#f9f9f9] h-16 border-b border-black">
        <div className="font-sans text-2xl font-black tracking-tighter text-black uppercase cursor-pointer hover:opacity-85 select-none">
          Url Shortener
        </div>

        <nav className="hidden md:flex gap-8 items-center h-full">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/"}
              className={({ isActive }) =>
                `font-sans text-[12px] font-bold tracking-widest uppercase pb-1 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "text-black border-black"
                    : "text-zinc-500 border-transparent hover:text-black hover:border-black/30"
                }`
              }
            >
              {menu.name}
            </NavLink>
          ))}
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
};

export default Navbar;
