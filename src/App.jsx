import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon} from "./utils/pokemon"

function App() {
  // APIのエンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevURL, setPrevURL] = useState('');
  const [nextURL, setNextURL] = useState('');

  useEffect(() => {
    // ====================
    // APIを通じたデータのフェッチ処理
    // ====================
    const fetchPokemonData = async () => {
      // 全てのポケモンデータの取得
      let res = await getAllPokemon(initialURL);

      // 20件のポケモン詳細データを取得
      loadPokemon(res.results);
      console.log(res);

      // 前ページのURLをセット
      setPrevURL(res.previous)
      // 次ページのURLをセット
      setNextURL(res.next)
      // ローディング処理終了
      setLoading(false);
    }
    fetchPokemonData();
  }, []);

  // ====================
  // 20件のポケモンデータから1件ずつ取得
  // ====================
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // 単一のポケモンの情報を取得
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // state更新
    setPokemonData(_pokemonData);
  };

  // --------------------
  // ページネーション処理（前へ）
  // --------------------
  const handlePrevPage = async () => {
    // 早期リターン
    if(!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  // --------------------
  // ページネーション処理（次へ）
  // --------------------
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };


  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
