import { useEffect, useState } from "react";
import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

const getDamage = (attacker,defender) => {
  document.addEventListener("keydown", (e)=>{
    if(e.key ==  controls.playerOneAttack){
      defender.health = defender.health - ( getHitPower(attacker) - getBlockPower(defender));
     
    }
    else if(e.key == controls.playerTwoAttack){
      attacker.health = attacker.health - (getHitPower(defender) - getBlockPower(attacker))
      
    }
  })

  let keysPressed = {};

  document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;
  });
  document.addEventListener('keyup', (event) => {
  delete this.keysPressed[event.key];
  });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      switch(event.key) {
      case "q":
      case "w":
      case "e":  
      if(keysPressed["q"] && keysPressed["w"] && keysPressed["e"]){
       defender.health = defender.health - (attacker.attack * 2);
      }
      break;
      default:
     
      }
      });
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      switch(event.key) {
      case "u":
      case "i":
      case "o":  
      if(keysPressed["u"] && keysPressed["i"] && keysPressed["o"]){
       attacker.health = attacker.health - (defender.attack * 2);
      }
      break;
      default:
      
      }
      });



};


const getHitPower = (fighter) => {
  const criticalHitChance = Math.floor(Math.random() * 2 + 1);
  const power = fighter.attack * criticalHitChance;
  return power
};

const getBlockPower = (fighter) => {
  const dodgeChance = Math.floor(Math.random() * 2 + 1);
  const power = fighter.defense * dodgeChance;
  return power
};

export const useFight = () => {
  const { selectedPair } = useArena();
 
  const { keysPressed } = useKeyPress();
  

  
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;

  // implement fight logic, return fighters details and winner details

  const [fighterOneDetails, setFighterOneDetails] = useState();
  const [fighterTwoDetails, setFighterTwoDetails] = useState();
  const [winner, setWinner] = useState(); 
  
  useEffect(()=>{
    
    setFighterOneDetails(selectedPair.playerOne);
    setFighterTwoDetails(selectedPair.playerTwo);
    getDamage(fighterOneDetails, fighterTwoDetails);
  })

  return { fighterOneDetails, fighterTwoDetails }
};
