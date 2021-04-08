/* 
Function that filters data that is being rendered
*/

export default function DataFilter(props) {
  const { cat, data, links, type, isLowConfidence } = props;

  var showLowConf = isLowConfidence
    ? data
    : data.filter((item) => item.lowConfidence === false);

  const filterCategory =
    cat === "armour"
      ? showLowConf
          .filter((item) => {
            return links === JSON.stringify(item.linkCount) || links === "All"
              ? item
              : "";
          })
          .filter((item) => {
            return type === item.group || type === "All" ? item : "";
          })
      : showLowConf;

  return filterCategory;
}
