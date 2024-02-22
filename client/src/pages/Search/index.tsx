/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";

import { useState, useCallback, useEffect, useRef } from "react";

import Input from "@/components/Input";
import Button from "@/components/Button";
import MovieItem from "@/components/MovieItem";
import movieApi from "@/apis/movie";
import useInput from "@/hooks/useInput";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { MovieType } from "@/@types/movie";
import MESSAGE from "@/constants/message";

const limit = 9;

function Search() {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useInput("");

  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1);
  const [disableLoadData, setDisableLoadData] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!search.trim().length) return alert(MESSAGE.SEARCH.SYNTAX_SEARCH);
    try {
      setIsSearch(true);
      const response = await movieApi.searchMovie(search, page, limit);
      if (!response.length) {
        setDisableLoadData(true);
        return;
      }
      if (page === 1) {
        setMovieList(response);
      } else {
        setMovieList((prev) => [...prev, ...response]);
      }
    } catch (error) {
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }, [search, page]);

  const loadData = () => {
    if (disableLoadData) return;
    setPage((prev) => prev + 1);
    handleSearch();
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [page, disableLoadData]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef?.current && isSearch) {
      setTargetRef(observerRef);
      loadData();
    }
  }, [isSearch]);

  // useEffect(() => {
  //   setMovieList([]);
  //   setPage(1);
  // }, [search]);

  return (
    <div className="search">
      <div className="search__input-wrapper">
        <Input
          name="search"
          placeholder="영화 제목을 입력해 주세요."
          value={search}
          onChange={setSearch}
        />
        <Button onClick={handleSearch}>검색하기</Button>
      </div>
      <div className="search__results">
        <ul className="search__list">
          {movieList.map((movie) => (
            <>
              <div key={movie.id}>
                <MovieItem movie={movie} />
              </div>
            </>
          ))}
          <div
            style={{
              height: "25px",
              width: "100%",
            }}
            ref={observerRef}
          ></div>
        </ul>

        {!movieList.length && <p className="search__empty">아무것도 없어요!</p>}
      </div>
    </div>
  );
}

export default Search;
