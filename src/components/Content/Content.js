import "./Content.css";
import { useState, useEffect, useCallback } from "react";
import ContentTable from "../ContentTable/ContentTable";
import { SearchField } from "../SearchField/SearchField";
import { Dropdown } from "../Dropdown/Dropdown";

export default function Content(props) {
  const { cat, index, data, loading } = props.props;

  const [search, setSearch] = useState("");
  const [isLowConfidence, setLowConfidence] = useState(false);
  const [links, setLinks] = useState("0");
  const [type, setType] = useState("All");

  useEffect(() => {
    setLowConfidence(false);
    setSearch("");
  }, [props, index]);

  useEffect(() => {
    if (type !== "bodyarmours") {
      setLinks("All");
    }
  }, [props, type]);

  const changeLowConf = useCallback(() => {
    setLowConfidence((con) => !con);
  }, [setLowConfidence]);

  const getSearch = useCallback(
    (data) => {
      setSearch(() => data);
    },
    [setSearch]
  );

  const getLinks = useCallback(
    (val) => {
      setLinks(() => val);
    },
    [setLinks]
  );

  const getType = useCallback(
    (val) => {
      setType(() => val);
    },
    [setType]
  );

  const sendProps = {
    cat,
    links,
    type,
    isLowConfidence,
    search,
    data,
    loading,
  };

  return (
    <div className="content-area">
      {
        //Creates a div with input field and a checkbox
      }
      <SearchField
        props={{ search, isLowConfidence }}
        getSearch={getSearch}
        changeLowConf={changeLowConf}
      />

      {
        //Creates a div with 2 dropdown fields
      }

      <Dropdown props={{ cat, links }} getLinks={getLinks} getType={getType} />

      {
        //Creates a table and fills it with data
        //with the data fetched from api
      }
      <ContentTable {...sendProps} />
    </div>
  );
}
