import "./style.scss";

import { useState, useEffect, cloneElement } from "react";
import { Link, useLocation } from "react-router-dom";

import CalendarIcon from "@/components/Icons/calendar";
import SearchIcon from "@/components/Icons/search";
import AccountIcon from "@/components/Icons/account";

const tabArr = [
  { name: "캘린더", icon: <CalendarIcon />, url: "/calendar" },
  { name: "검색", icon: <SearchIcon />, url: "/search" },
  { name: "My", icon: <AccountIcon />, url: "/my" },
];
function TabBar() {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const currentIndex = tabArr.findIndex(
      (item) => item.url === location.pathname
    );
    if (currentIndex !== -1) {
      setCurrentTab(currentIndex);
    }
  }, [location.pathname]);

  return (
    <div className="tab-bar">
      <ul className="tab-bar__container">
        {tabArr.map((el, idx) => {
          const { name, icon, url } = el;
          const isActive = idx === currentTab;
          const color = isActive ? "#6e41e2" : "#585858";

          return (
            <li
              className="tab-bar__item"
              key={idx}
              onClick={() => setCurrentTab(idx)}
            >
              <Link to={url}>
                <div
                  className={`tab-bar__item-content ${isActive && "active"}`}
                >
                  <div className="icon">{cloneElement(icon, { color })} </div>
                  <p className={`${isActive && "active"}`}>{name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TabBar;
