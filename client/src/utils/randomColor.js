const colors = ["#6700f2", "#d100a4", "#00cce3", "#07ad62", "#f59b00"];
// returns random colors from selection
export default function () {
  return colors[Math.floor(Math.random() * colors.length)];
}
