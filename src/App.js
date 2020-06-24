import React, { Fragment,useState,useEffect, Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './App.css';

function App() {

const [pokedex,setPokedex]=useState([])
const [wildPokemon,setWildPokemon]=useState({});
useEffect(()=>{
  encoderWildPokemon()
},[])
const pokeId =()=>{
  const min = Math.ceil(1)
  const max = Math.floor(151)
  return Math.floor(Math.random()*(max-min+1))+min
}
const encoderWildPokemon = () =>{
   axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId()}`)
   .then(res=>{
     console.log(res.data);
     setWildPokemon(res.data);
   })
}
  return (
    <Fragment>
      <div className="app-wrapper">
        <h1>
          hello world!!!!
    </h1>

      </div>
    </Fragment>
  );
}

export default App;
