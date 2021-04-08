import { useEffect, useState } from "react";
/*
Function that fetches data from a url
Returns data when it has received it, until then
is set to loading
*/
export default function useFetch(url) {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    setState((state) => ({
      data: state.data,
      loading: true,
    }));

    fetch(url)
      .then((x) => {
        if (x.ok) {
          return x.json();
        }
      })
      .then((y) => {
        setState({
          data: y,
          loading: false,
        });
      });
  }, [url, setState]);

  return state;
}
