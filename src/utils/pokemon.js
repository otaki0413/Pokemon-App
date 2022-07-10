// ====================
// 全ポケモンデータをJSON形式で取得
// ====================
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  })
};

// ====================
// 1つ1つのポケモンデータをJSON形式で取得
// ====================
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  })
};
