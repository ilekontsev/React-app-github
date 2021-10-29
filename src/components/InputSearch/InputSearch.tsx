import { useCallback, MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import {
  HIDDEN_OR_VISIBLE_CLASS,
  INPUT_TEXT,
  RESULT_INPUT_SEARCH,
} from "../../Store/Selector";
import axios from "axios";
import { gitToken } from "../../Store/Reducer";
import store from "../../Store/Store";
import {
  ActionHiddenFocus,
  ActionInputSave,
  ActionSaveResultSearch,
} from "../../Store/Action";
import { repeatedReqReposWithWatchers } from "../../Store/Effect";
// import "./InputSearchStyle.css";
const debounce = require("lodash.debounce");

export interface DescRes {
  data: {
    items: [
      {
        name: string;
      }
    ];
  };
}
function InputSearch() {
  const inputText: string = useSelector(INPUT_TEXT);
  const resultInputSearch: string[] = useSelector(RESULT_INPUT_SEARCH);
  const hiddenClass: string = useSelector(HIDDEN_OR_VISIBLE_CLASS);

  const debouncedSave = useCallback(
    debounce((newValue: string) => reqSearch(newValue), 500),
    [debounce]
  );

  const reqSearch = async (newValue: string) => {
    console.log(newValue);
    const res: DescRes = await axios.get(
      `https://api.github.com/search/repositories?q=${newValue}+in:name&per_page=7`,
      {
        headers: {
          Authorization: `token ${gitToken}`,
        },
      }
    );
    if (!res.data.items[0]) {
      store.dispatch(ActionSaveResultSearch([]));
      store.dispatch(ActionHiddenFocus("hidden-element"));
      return 0;
    }
    let nameRepo: Array<string> = res.data.items.map((item) => item.name);

    const resultSearch = Array.from(new Set(nameRepo));
    store.dispatch(ActionSaveResultSearch([...resultSearch]));
  };

  const inputSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    store.dispatch(ActionInputSave(e.target.value));

    if (e.target.value.length === 0) {
      store.dispatch(ActionSaveResultSearch([]));
      store.dispatch(ActionHiddenFocus("hidden-element"));
    }
    if (e.target.value.length > 1) {
      store.dispatch(ActionHiddenFocus("search-wrapper"));
      debouncedSave(e.target.value);
    }
  };

  //нажатие кнопки интер
  const keyEnter = async (e: KeyboardEvent<EventTarget>) => {
    try {
      const target = e.target as HTMLInputElement;
      if (e.key === "Enter" && target.value.trim().length !== 0) {
        const res = await axios.get(
          `https://api.github.com/search/repositories?q=${inputText}+in:name&per_page=1`,
          {
            headers: {
              Authorization: `token ${gitToken}`,
            },
          }
        );

        store.dispatch(ActionHiddenFocus("hidden-element"));
        store.dispatch(repeatedReqReposWithWatchers(res.data.items));
      }
    } catch (err) {
      console.log(err);
    }
  };

  //выбрать из поиска
  const clickElementSearch = async (e: MouseEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    store.dispatch(ActionInputSave(target.innerText));
    store.dispatch(ActionHiddenFocus("hidden-element"));
    try {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=${target.innerText}+in:name&per_page=1`,
        {
          headers: {
            Authorization: `token ${gitToken}`,
          },
        }
      );
      store.dispatch(repeatedReqReposWithWatchers(res.data.items));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search">
      <Input
        type={"search"}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        className={"block-input-search"}
        onChange={inputSearch}
        onKeyDown={keyEnter}
        value={inputText}
        placeholder={"search repos"}
      />
      <div className={hiddenClass}>
        {resultInputSearch.map((item, index) => (
          <div
            onClick={clickElementSearch}
            className={"element-search"}
            key={index}
          >
            <SearchIcon />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputSearch;
