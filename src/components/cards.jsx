import { useEffect, useState } from "react";
import "../styles/cards.css";
import random from "random";

function Cards() {
  const [characters, setCharacters] = useState([]);
  // var characterNumbers = [random.int(1,100), 2, 3, 4, 5, 6, 7, 8];
  var characterNumbers = new Array(8).fill().map(() => random.int(1,1025))

  function checkClicked(item) { 
    if (item.clicked == false) {
      item.clicked = true; 
      
    }
  }

  useEffect(() => {
    console.log("effect trigger");
    async function getPokemon(number) {
      try {
        const call = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);

        const data = await call.json();
        characters.push({
          id: number,
          name: data.name.toUpperCase(),
          image: `https://img.pokemondb.net/artwork/${data.name}.jpg`,
        });
      } catch (error) { 
        console.error(error);   
      }
    }
    characterNumbers.forEach((number) => {
      getPokemon(number); 
    }); 
    console.log(characters);
  }, [characters,setCharacters]); 

  return ( 
    // <>
    <div id="cards"> 
      {characters.map((character) => {
        return ( 
        <div className="card" key={character.id} onClick={}> 
          <img src={character["image"]} />
          <h2>{character["name"]}</h2>  
        </div>
        ) 
      })
      }
    </div>
    // </>
  );
} 

export default Cards;
