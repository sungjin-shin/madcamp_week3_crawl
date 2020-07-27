import fetch from "node-fetch";
// TODO: 사용자한테서 요청 받기 O
// Naver OpenAPI로 요청보내서 결과값 받기
// 받은 결과값을 필요한부분만 잘라기 사용자한테 건내주기.

import { RequestHandler } from "express";
import { URL, URLSearchParams } from "url";

export const getNews: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.query);
    const comp = {
      comp: req.query.comp as string,
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

function getData(url) {
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
      console.log(myJson);
      return myJson;
    })
    .catch((error) => {
      console.error(error);
    });

  // var newUrl = new URL(url);

  // var query = data;

  // newUrl.search = new URLSearchParams(query).toString();

  // fetch(newUrl)
  //   .then((response) => {
  //     console.log(JSON.stringify(response));
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}
