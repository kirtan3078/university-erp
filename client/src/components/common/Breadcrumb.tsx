import { Link, useLocation } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = pathnames.map((segment, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label = segment
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    return { label, to };
  });

  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
      <Link to="/" className="transition hover:text-white">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.to} className="flex items-center gap-2">
            <span className="text-slate-500">/</span>
            {isLast ? (
              <span className="text-slate-200">{item.label}</span>
            ) : (
              <Link to={item.to!} className="transition hover:text-white">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
