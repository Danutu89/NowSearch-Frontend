import {
  SEARCH,
  SEARCHED,
  SEARCH_FAILED,
  SEARCH_RESET,
  SEARCH_MORE,
  SEARCHED_MORE,
  SEARCH_MORE_FAILED,
} from "$constants/index";
import { search as searchState } from "../stores/index";

const intialState = {
  data: {},
  error: "",
  errorMore: "",
  searched: false,
  query: "",
  loading: false,
  loadingMore: false,
  category: "general",
  page: 1,
};

const searchReducer = (action) => {
  const state = searchState || intialState;
  switch (action.type) {
    case SEARCH:
      state.query = action.query;
      state.loading = true;
      state.error = "";
      state.data = {};
      state.searched = true;
      state.category = action.category;

      break;
    case SEARCHED:
      state.loading = false;
      state.data = action.data;
      state.page = 1;
      break;
    case SEARCH_FAILED:
      state.loading = false;
      state.error = action.error;
      break;
    case SEARCH_RESET:
      state.query = "";
      state.loading = false;
      state.error = "";
      state.data = {};
      state.searched = false;
      state.category = "general";
      break;
    case SEARCH_MORE:
      state.loadingMore = true;
      state.page = action.page;
      break;
    case SEARCHED_MORE:
      state.data.results = [...state.data.results, ...action.data];
      state.loadingMore = false;
      break;
    case SEARCH_MORE_FAILED:
      state.errorMore = action.error;
      state.loadingMore = false;
      break;
  }
  return state;
};

export { searchReducer };
