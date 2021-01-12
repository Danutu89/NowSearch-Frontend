import {
  searched,
  searchFailed,
  imageReset,
  searchedMore,
  searchMoreFailed,
} from "$actions/index";
import { SEARCH, SEARCH_MORE } from "$constants/index";
import { dispatch } from "$utils/index";
import { search as searchState } from "$stores/index";

const search = async ({ query, name, category }) => {
  const body = new FormData();
  body.append("q", query);
  body.append("language", "en");
  body.append("pageno", 1);
  body.append("pagsize", "10");

  switch (category || searchState.category) {
    case "general":
      body.append("category_videos", "on");
      body.append("category_it", "on");
      body.append("category_general", "on");
      body.append("category_movies", "on");
      break;
    case "videos":
      body.append("category_videos", "on");
      break;
    case "images":
      body.append("category_images", "on");
      break;
  }

  try {
    const data = await fetch(`api/search`, {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((res) => res);
    dispatch(() => searched(data, name));
  } catch (error) {
    dispatch(() => searchFailed(error.message, name));
  }
};

const searchMore = async ({ page, name }) => {
  const body = new FormData();
  body.append("q", searchState.query);
  body.append("language", "en");
  body.append("pageno", page);
  body.append("pagsize", "10");

  switch (searchState.category) {
    case "general":
      body.append("category_videos", "on");
      body.append("category_it", "on");
      body.append("category_general", "on");
      break;
    case "videos":
      body.append("category_videos", "on");
      break;
    case "images":
      body.append("category_images", "on");
      break;
  }

  try {
    const data = await fetch(`api/search`, {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((res) => res);

    dispatch(() => searchedMore(data.results, name));
  } catch (error) {
    dispatch(() => searchMoreFailed(error.message, name));
  }
};

export function searchInterceptor(action) {
  switch (action.type) {
    case SEARCH:
      search(action);
      dispatch(() => imageReset("images"));
      break;
    case SEARCH_MORE:
      searchMore(action);
      break;
  }
}
