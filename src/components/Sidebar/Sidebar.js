import React, { useState } from "react";
import shortid from "shortid";
import Loader from "../Loader/Loader";
import useFetch from "../Hooks/useFetch";
import "./Sidebar.css";

//Function that fetches data from an api and displays it in the sidebar

export const Sidebar = React.memo(({ getCat }) => {
  const { data, loading } = useFetch("https://api.poe.watch/categories");
  const [active, setActive] = useState("armour");
  const change = {
    id: 22,
    name: "watchstones",
    display: "Watchstones",
    groups: [],
  };

  //Since the api is not 100% correct, I need to manually fix it up a little
  const filteredData = data.filter((item) => {
    return item.name !== "resonator" && item.name !== "enchants" ? item : "";
  });

  filteredData.push(change);

  return (
    <div className="sidebar">
      {loading ? (
        <Loader />
      ) : (
        <ul className="sidebar-wrapper">
          {/* Maps over the data fetched from the api, fills the sidebar with
          different categories that can be called in the main content table */}
          {filteredData.map((elem) => (
            <li key={shortid.generate()} className="category">
              <div className="resizer">
                <img
                  className="list-icon"
                  src={"../icon/" + elem.name + ".png"}
                  alt=""
                ></img>
              </div>

              <button
                id={active === elem.name ? "active" : ""}
                onClick={() => {
                  getCat(elem.name);
                  setActive(elem.name);
                }}
                className="category-button"
              >
                {elem.display}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
