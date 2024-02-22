export interface MovieType {
  actorNm: string;
  company: string;
  directorNm: string;
  genre: string;
  id: string | null;
  plot: string;
  posterUrl: string;
  prodYear: string;
  rating: string;
  releaseDate: string | null;
  runtime: string;
  title: string;
}

export interface releasedType {
  title: string;
  releaseDate: Date;
}

export interface watchedType {
  title: string;
  watchedAt: Date;
}

export interface CalendarMovieType {
  moviesReleasedInMonth: releasedType[];
  userWatchedMoviesInMonth: watchedType[];
}
