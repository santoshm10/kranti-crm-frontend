import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Kranti CRM");

  const titleMap = {
    "/": "Kranti CRM Dashboard",
    "/leads": "Lead List",
    "/leads/new": "Add New Lead",
    "/agents": "Sales Agent Management",
    "/agents/new": "Add New Agent",
    "/reports": "Reports",
    "/setting": "Settings",
  };

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/leads/")) {
      if (currentPath.endsWith("/edit")) {
        setPageTitle("Edit Lead");
      } else if (currentPath !== "/leads/new") {
        setPageTitle("Lead Details");
      }
    } else if (
      currentPath.startsWith("/agents/") &&
      currentPath !== "/agents/new"
    ) {
      setPageTitle("Leads by Sales Agent");
    } else {
      setPageTitle(titleMap[currentPath] || "Page Not Found");
    }
  }, [location.pathname]);

  return (
    <header className=" border-b border-gray-200 pt-3 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        {pageTitle}
      </h1>
    </header>
  );
};

export default Header;
