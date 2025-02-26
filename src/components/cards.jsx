import { useEffect, useState } from "react";
import "../styles/cards.css";
import random from "random";
import shuffleArray from "shuffle-array";

function Cards() {
  const [characters, setCharacters] = useState([]);

  var characterNumbers = new Array(8).fill().map(() => {
    random.int(1,1025)}
  )

  function checkClicked(item) { 
    if (item.clicked == false) {
      return item.clicked = true; 

    }
    else if (item.clicked == true) {
      manageCharacters();
    }
    console.log(item)
    shuffleOrder();
    console.log(characters);
  }
  
  function shuffleOrder(){
    setCharacters(shuffleArray([...characters]))
  }
  function manageCharacters(info){ 
    setCharacters((prevItems) => [...prevItems, info])
  }
  
  useEffect(() => { 
    console.log("effect trigger");
    async function getPokemon(number) {
      try {
        const call = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);

        const data = await call.json();
        manageCharacters({
          id: number,
          name: data.name.toUpperCase(),
          image: `https://img.pokemondb.net/artwork/${data.name}.jpg`,
          clicked: false,
        });
      } catch (error) { 
        console.error(error);     
      }
    }
    if (characters.length < 1) {
    characterNumbers.forEach((number) => {
      getPokemon(number); 
    });
  }
    console.log(characters);
  }, []);  

  return ( 
    // <>
    <div id="cards">
      {console.log("rendered!")} 
      {characters.map((character) => {
        return ( 
        <div className="card" key={character.id} onClick={checkClicked} > 
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
