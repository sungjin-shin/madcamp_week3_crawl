import fetch from "node-fetch";

import { RequestHandler } from "express";
import { URL, URLSearchParams } from "url";

export const getNews: RequestHandler = async (req, res, next) => {
  try {
    const comp = {
      comp: req.body.comp as string,
    };
    const params = new URLSearchParams({ query: comp.comp });
    getData("https://openapi.naver.com/v1/search/news.json?" + params).then(
      (data) => {
        return res.json({ data: data.items });
      }
    );
    // return res.json({ msg: comp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "듀금" });
  }
};

function getData(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Naver-Client-Id": "AVFSu7VVYaAEg2waq5Mk",
      "X-Naver-Client-Secret": "ETWI54y3E9",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      return myJson;
    })
    .catch((error) => {
      console.error(error);
    });
}
