const normalizeReleaseDate = (repRlsDate) => {
  if (!repRlsDate || repRlsDate === "0000") {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-01-01`;
  }

  const currentYear = new Date().getFullYear().toString();
  const currentCentury = currentYear.slice(0, 2);

  // repRlsDate 값이 2자리 숫자인 경우, 해당 연도를 포함하여  변환
  if (repRlsDate.length === 2) {
    const year = parseInt(currentCentury + repRlsDate, 10);
    return `${year}-01-01`;
  }

  const year = repRlsDate.substr(0, 4);
  const month = repRlsDate.substr(4, 2) || "01";
  const day = repRlsDate.substr(6, 2) || "01";

  return `${year}-${month}-${day}`;
};

const excludeGenre = (genre) => {
  const excludedGenres = ["에로"];
  const genres = genre.split(",");

  return genres.every((g) => !excludedGenres.includes(g.trim()));
};

module.exports = {
  normalizeReleaseDate,
  excludeGenre,
};
