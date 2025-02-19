import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartoonList.css"; // עיצוב לדמויות

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const CartoonList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  // טעינת דמויות מה-API
  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character")
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error("❌Error", error));
  }, []);

  return (
    <div className="cartoon-list">
      <h2>🎭Rick & Morty</h2>
      <div className="cartoon-container">
        {characters.map(character => (
          <div key={character.id} className="cartoon-item">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p><strong>type:</strong> {character.species}</p>
            <p><strong>status:</strong> {character.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartoonList;

