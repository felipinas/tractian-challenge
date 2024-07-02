import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

import { companyService } from "../services/company";

import tractianLogo from "../assets/tractian.svg";
import { twMerge } from "tailwind-merge";

export function Header() {
  const { data: companies } = useQuery({
    queryKey: ["/companies"],
    queryFn: companyService.getCompanies,
  });

  return (
    <header className="bg-[#17192D] py-3 px-4 flex justify-between">
      <img src={tractianLogo} alt="Tractian" />

      <nav className="flex gap-2.5">
        {companies?.map((company) => {
          return (
            <NavLink
              to={`/${company.id}`}
              className={({ isActive }) =>
                twMerge(
                  "py-1 px-2 text-white text-xs font-semibold rounded-sm",
                  isActive ? "bg-[#2188FF]" : "bg-[#023B78]"
                )
              }
            >
              {company.name}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
