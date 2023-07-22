import { BugType, 
  DarkType, 
  DragonType, 
  ElectricType, 
  FairyType,
  FightingType,
  FireType,
  FlyingType,
  GhostType,
  GrassType,
  GroundType,
  IceType,
  NormalType,
  PoisonType,
  PsychicType,
  RockType,
  SteelType,
  WaterType } 
from '../data/images'

function Capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPokemonNumberFromURL(url) {
  const urlParts = url.split('/');
  const pokemonNumber = urlParts[urlParts.length - 2];

  return parseInt(pokemonNumber, 10);
}

function buildPokemonURLFromNumber(number){
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const url = `${baseUrl}${number}/`;

  return url;
}

function generateId(){
  const random = Math.random().toString(36).substr(2);
  const fecha = Date.now().toString(36);

  return random+fecha;
}

const getTypeIcon = (type) => {
  switch (type) {
    case "bug":
      return BugType
    case "dark":
      return DarkType
    case "dragon":
      return DragonType
    case "electric":
      return ElectricType
    case "fairy":
      return FairyType
    case "fighting":
      return FightingType
    case "ghost":
      return GhostType
    case "grass":
      return GrassType
    case "ground":
      return GroundType
    case "ice":
      return IceType
    case "normal":
      return NormalType
    case "poison":
      return PoisonType
    case "psychic":
      return PsychicType
    case "rock":
      return RockType
    case "steel":
      return SteelType
    case "water":
      return WaterType
    case "fire":
      return FireType
    case "flying":
      return FlyingType
    default:
      return null;
  }
}

export {Capitalize, getPokemonNumberFromURL, buildPokemonURLFromNumber, getTypeIcon, generateId}