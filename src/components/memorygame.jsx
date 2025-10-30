import { useEffect, useState } from "react";
import "../styles/memorygame.css";
import "../styles/cards.css";
import random from "random";
import shuffleArray from "shuffle-array";
import Cookies from "js-cookie";

function Game() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  var characterNumbers = generateCharacters();
  var gameLoss = false;

  function generateCharacters() {
    // generates unique character codes
    let temporarySet = new Set();
    const result = [1, 2, 3, 4, 5, 6, 7, 8].map(() => {
      let characterNums;
      do {
        characterNums = random.int(1, 1025);
      } while (temporarySet.has(characterNums));

      temporarySet.add(characterNums);
      return characterNums;
    });
    return result;
  }
  function checkClicked(item) {
    if (item.clicked == false) {
      changeScore();
      item.clicked = true;
    } else if (item.clicked == true) {
      gameLoss = true;
    }
    shuffleOrder();
    manageGameState();
  }

  function shuffleOrder() {
    setCharacters(shuffleArray([...characters]));
  }
  function manageCharacters(info) {
    setCharacters((prevItems) => [...prevItems, info]);
  }
  function clearCharacters() {
    setCharacters(new Array());
  }
  function changeScore() {
    setScore(score + 1);
  }
  function changeHighScore(currentScore) {
    if (currentScore > highScore) {
      setHighScore(score);
      Cookies.set("highScore", `${currentScore}`);
    }
  }
  function parseSavedScore(score) {
    setHighScore(score);
  }

  function manageGameState() {
    if (gameLoss) {
      changeHighScore(score);
      window.location.reload(true);
    } else if (characters.every(checkCards)) {
      clearCharacters();
    }
  }

  function checkCards(card) {
    return card.clicked == true;
  }

  useEffect(() => {
    async function getPokemon(number) {
      try {
        const call = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);

        const data = await call.json();
        manageCharacters({
          id: number,
          name: data.name.toUpperCase(),
          image: `https://img.pokemondb.net/artwork/${data.name}.jpg`,
          image2: data.sprites.front_default,
          clicked: false,
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (characters.length < 1) {
      parseSavedScore(parseInt(Cookies.get("highScore")) || 0);
      characterNumbers.forEach((number) => {
        getPokemon(number);
      });
    }
  }, [characters]);

  return (
    <>
      <div>
        <h1>Pokèmon Memory Game!</h1>
        <h2>Try to remember which cards you clicked!</h2>
        <div id="score-container">
          <button id>Score: {score}</button>
          <button> Highscore: {highScore}</button>
        </div>
      </div>

      <div id="cards">
        {characters.map((character) => {
          return (
            <div
              className="card"
              key={character.id}
              onClick={() => checkClicked(character)}
            >
              <img src={character["image"] || character["image2"]} />
              <h2>{character["name"]}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Game;
