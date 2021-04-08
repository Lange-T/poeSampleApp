import React from "react";
import "./Dropdown.css";

export const Dropdown = React.memo(({ props, getLinks, getType }) => {
  const { cat, links } = props;

  //Component displays 2 dropdown menus that send their values back
  //to parent component

  return (
    <div className="dropdown-filter">
      <div className="dropdown-flex">
        <div className="armour-links">
          <label className="links-label" htmlFor="links">
            Links
          </label>
          <select
            value={links}
            disabled={cat !== "armour"}
            onChange={(event) => getLinks(event.target.value)}
            name="links"
            id="links"
          >
            <option>All</option>
            <option>6</option>
            <option>5</option>
          </select>
        </div>

        <div className="armour-type">
          <label className="types-label" htmlFor="type">
            Type
          </label>
          <select
            disabled={cat !== "armour"}
            onChange={(event) => getType(event.target.value)}
            name="type"
            id="type"
          >
            <option value="All">All</option>
            <option value="helmets">Helmet</option>
            <option value="bodyarmours">Body Armour</option>
            <option value="shields">Shield</option>
            <option value="gloves">Gloves</option>
            <option value="boots">Boots</option>
          </select>
        </div>
      </div>
      <div
        style={{
          opacity: cat === "armour" ? "0" : "1",
        }}
      >
        <span className="tooltiptext">Currently only works for Armour</span>
      </div>
    </div>
  );
});
