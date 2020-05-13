export default function (...names) {
  let classes = [];
  for (let item of names) {
    if (typeof item === "string") classes.push(item);
    else if (Array.isArray(item)) {
      for (let str of item) {
        if (typeof str === "string") classes.push(str);
      }
    } else if (typeof item === "object") {
      for (let key in item) {
        if (item[key]) classes.push(key);
      }
    }
  }
  return classes.join(" ");
}
