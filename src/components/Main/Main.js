import { useCallback, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import "./Main.css";
import useFetch from "../Hooks/useFetch";
import Loader from "../Loader/Loader";

//Component that gets data for the content table
export default function Main() {
  const [cat, setCat] = useState("armour");
  const { data, loading } = useFetch(
    `https://api.poe.watch/get?category=${cat}&league=Ritual`
  );
  const index = 1;

  const getCat = useCallback(
    (val) => {
      setCat(() => val);
    },
    [setCat]
  );

  const props = { cat, index, data, loading };

  //Displays the sidebar as well as the main content.
  return (
    <div className="flex">
      <Sidebar getCat={getCat} />

      {loading ? <Loader /> : <Content props={props} />}
    </div>
  );
}
