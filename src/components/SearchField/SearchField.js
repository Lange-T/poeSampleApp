import React from "react";
import { BsSearch } from "react-icons/bs";

import "./SearchField.css";

//Function that creates a div with an input field
//and checkbox to filter the data.
//Sends its data back to the parent to used in DataFilter function.

export const SearchField = React.memo(({ getSearch, changeLowConf, props }) => {
  const { search, isLowConfidence } = props;

  return (
    <div className="search-flex">
      <div className="search-header">
        <div className="center">
          <BsSearch />
        </div>
        <input
          value={search}
          onChange={(event) => getSearch(event.target.value)}
          placeholder="Search"
          className="search-filter"
        />
      </div>

      <input
        checked={isLowConfidence}
        id="lowConf"
        type="checkbox"
        onChange={changeLowConf}
      />
      <label style={{ color: "#dddddd" }} htmlFor="lowConf">
        Show low confidence
      </label>
    </div>
  );
});
