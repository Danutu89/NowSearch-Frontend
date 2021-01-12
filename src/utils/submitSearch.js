import { search } from "$actions/index";
import { dispatch } from "./dispatcher";
import { search as searchState } from "$stores/index";

export default (query, category = null) => {
  window.history.replaceState(
    null,
    null,
    `?q=${encodeURIComponent(query)}&category=${
      category || searchState.category || "general"
    }`
  );
  dispatch(() =>
    search(query, "home", category || searchState.category || "general")
  );
};
