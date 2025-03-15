import { useState } from "react";

function Navigation({ setCurrentPage }) {
  const [activePage, setActivePage] = useState("About");

  const handlePageChange = (page) => {
    setActivePage(page);
    setCurrentPage(page);
  };

  return (
    <nav>
      <ul>
        {["About", "Portfolio", "Contact", "Resume"].map((section) => (
          <li key={section} className={activePage === section ? "active" : ""}>
            <button onClick={() => handlePageChange(section)}>{section}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
