import axios from "axios";

const options = (query) => {
  return {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: { q: query, lang: "en" },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_API_HOST,
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };
};

export const getArticles = async (query) => {
  const response = await axios
    .request(options(query))
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return response;
};
