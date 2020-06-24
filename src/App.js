import React, { Fragment, useState, useEffect, Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './App.css';

function App() {

  const [pokedex, setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({});
  useEffect(() => {
    encoderWildPokemon()
  }, [])
  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const encoderWildPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId()}`)
      .then(res => {
        console.log(res.data);
        setWildPokemon(res.data);
      })
  }
  const catchPokemon = (pokemon) => {
    setPokedex(state => {
      const monExists = (state.filter(p => pokemon.id == p.id).length > 0);
      if (!monExists) {
        state = [...state, pokemon]
        state.sort(function (a, b) {
          return a.id - b.id
        })
      }
      return state
    })
        encoderWildPokemon()

  }
  const releasePokemon = (id) => {setPokedex(state => state.filter(p => p.id != id))}
  return (
    <Fragment>
      <div className="app-wrapper">
        <h1 className="title">
          React hooks
        </h1>
        <h3 className="subtitle">
          with Pokemon
         </h3>


        <section className="wuild-pokemon">
          <h2>Wild Encounter</h2>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${wildPokemon.id}.png`} className="sprite" />
          <h3>{wildPokemon.name}</h3>
          <h3>{wildPokemon.base_experience}</h3>



          <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
        </section>



        <section className="pokedex">
          <h2>Pokédex</h2>
          <div className="pokedex-list">
            {pokedex.map(pokemon => (
              <div className="pokemon" key={pokemon.id}>
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
                <h3 className="pokemon-name">{pokemon.name}</h3>
                <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Fragment>
  );
}

export default App;
