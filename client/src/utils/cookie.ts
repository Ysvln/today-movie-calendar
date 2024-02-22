export const getCookie = (targetKey: string) => {
  const cookies = document.cookie.split("; ").map((cookie) => {
    const [key, value] = cookie.split("=");
    return {
      [key]: value,
    };
  });

  const cookiesObject = Object.assign({}, ...cookies);

  return decodeURIComponent(cookiesObject[targetKey]);
};
