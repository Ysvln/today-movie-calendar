/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";

import { useState, useEffect } from "react";

import ArrowLeft from "@/components/Icons/arrowLeft";
import { useLocation } from "react-router-dom";

const pageArr = [
  { title: "", url: "/calendar", hasBackButton: false, hide: true },
  {
    title: "영화 상세 페이지",
    url: "/movie",
    hasBackButton: true,
    hide: false,
  },
  { title: "영화 검색", url: "/search", hasBackButton: false, hide: false },
  { title: "마이페이지", url: "/my", hasBackButton: false, hide: false },
  { title: "마이페이지", url: "/my/", hasBackButton: false, hide: false },
  {
    title: "내가 별점 준 작품들",
    url: "/my/rating",
    hasBackButton: true,
    hide: false,
  },
  {
    title: "내가 코멘트한 작품들",
    url: "/my/commented",
    hasBackButton: true,
    hide: false,
  },
  {
    title: "내가 본 작품들",
    url: "/my/watched",
    hasBackButton: true,
    hide: false,
  },
];
const Header = () => {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [showBack, setShowBack] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const currentPage = pageArr.find((page) => {
    return location.pathname === page.url;
  });

  const handleScroll = () => {
    setHideHeader(window.scrollY > 50);
  };

  useEffect(() => {
    if (currentPage && !currentPage.hide) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (currentPage) {
      setTitle(currentPage.title);
      setShowBack(currentPage.hasBackButton);
      setHideHeader(currentPage.hide);
    }
    if (location.pathname.startsWith("/movie/")) {
      // 동적인 페이지에 대한 적용?
      setHideHeader(false);
      setShowBack(true);
      setTitle("영화 상세");
      window.addEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`header ${hideHeader ? "hidden" : ""}`}>
      {showBack && (
        <button className="header__back-button" onClick={handleGoBack}>
          <ArrowLeft />
        </button>
      )}
      <h2 className="header__title">{title}</h2>
    </div>
  );
};

export default Header;
