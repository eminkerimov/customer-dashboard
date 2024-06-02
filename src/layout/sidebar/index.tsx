import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";

interface LinkItem {
  path: string;
  label: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const links: LinkItem[] = [
    { path: "/", label: t('customerList') },
    { path: "/create", label: t('createCustomer') },
  ];

  return (
    <aside>
      <nav>
        <ul>
          {links.map((link) => (
            <li
              key={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
