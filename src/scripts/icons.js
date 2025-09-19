function importAll(r) {
  let icons = {};
  r.keys().forEach((key) => {
    const name = key.replace("./", "").replace(/\.(png|jpg|svg|jpeg)$/i, "");
    const mod = r(key);

    icons[name] = (mod && mod.default) ? mod.default : mod;
  });
  return icons;
}

const icons = importAll(require.context("../icons", false, /\.(png|jpg|svg)$/));

export default icons;
