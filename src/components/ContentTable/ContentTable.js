import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import shortid from "shortid";
import DataFilter from "../Functions/DataFilter";
import Loader from "../Loader/Loader";

import "./ContentTable.css";

//Function that creates a table with the data fetched from the api

export default function ContentTable(props) {
  const { cat, links, type, isLowConfidence, search, data, loading } = props;
  const [sorted, setSorted] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);

  //Variable that will be passed to DataFilter.
  //Gets its values from the parent component
  const fil = { cat, data, links, type, isLowConfidence };

  //Scroll handler for infinite scrolling
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPageIndex(pageIndex + 1);
    }
  };

  useEffect(() => {
    setPageIndex(1);
    setSorted(true);
  }, []);

  //Function that reverses an array
  const sort = (obj) => {
    return obj.sort(function (a, b) {
      if (sorted) {
        return b.mean - a.mean;
      } else {
        return a.mean - b.mean;
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div onScroll={handleScroll} className="overflower">
          <table>
            <thead>
              <tr className="table-header-row">
                <th className="table-icon">Icon</th>
                <th className="table-name">Name</th>
                <th className="table-link">Link</th>
                <th className="table-change">Change</th>
                <th
                  className="table-chaos"
                  //Onclick function that reverses the data
                  onClick={() => {
                    setSorted(!sorted);
                    sort(DataFilter(fil));
                  }}
                >
                  Chaos {sorted ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
                </th>
                <th className="table-exalt">Exalt</th>
              </tr>
            </thead>
            <tbody>
              {/* Sorts data on render, calls DataFilter with values
              That were passed to this component. Then maps data and displays it in a table */}
              {sort(DataFilter(fil))
                .filter((val) => {
                  return val.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                    ? val
                    : "";
                })
                .map((x) => {
                  return (
                    <tr key={shortid.generate()} className="table-row">
                      <td className="table-icon">
                        <img
                          className="table-row-icon"
                          src={x.icon}
                          alt=""
                        ></img>
                      </td>
                      <td
                        className="table-name"
                        style={{
                          color: x.lowConfidence === true ? "red" : "#dddddd",
                        }}
                      >
                        {x.name}
                      </td>
                      <td className="table-link">
                        <a
                          style={{ cursor: "pointer" }}
                          className="link"
                          target="_blank"
                          rel="noreferrer"
                          href={"https://pathofexile.fandom.com/wiki/" + x.name}
                        >
                          <BsSearch />
                        </a>
                      </td>
                      <td
                        className="table-change"
                        style={{ color: x.change > 0 ? "green" : "red" }}
                      >
                        {x.change}%
                      </td>
                      <td>
                        <div className="table-currency-cell">
                          <img
                            className="table-row-icon"
                            src={
                              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png"
                            }
                            alt=""
                          ></img>
                          <div>{x.mean}</div>
                        </div>
                      </td>
                      <td>
                        <div className="table-currency-cell">
                          <img
                            className="table-row-icon"
                            src={
                              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png"
                            }
                            alt=""
                          ></img>
                          <div>{x.exalted}</div>
                        </div>
                      </td>
                    </tr>
                  );
                })
                .slice(0, 25 * pageIndex)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
