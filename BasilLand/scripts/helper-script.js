// import { helpDisplay } from "./doc-object-script.js";
const welcomeInfo = `Welcome to Basil Land, i will help you on your journey to riches,
hover over the tabs to get more information on each building or resource. Click on me to
hide me, type 'help' if you would like me to come back.`
const houseInfo = `Houses cost 300 wood, 50 stone and 1 idle worker to build the house.
Houses have an upkeep of 0.5 wood per house per day.`
const workerInfo = `Workers require 200 food, and 2 idle workers to spawn a new worker.
Each active worker also consumes 3 food per day, idle workers do not eat.`
const traderInfo = `To open the trader, 2000 food, 1000 wood, 500 stone and 6 idle workers
will be needed. The trader will serve as a valuable exchange.`
const storageInfo = `The town has a base storage of 1000 wood, 750 stone and wood.
Upgraing the storage will cost 500 stone, 200 wood and 3 idle workers will be required.
each upgrade will add the base storage values to the current storage value. the storage 
can be upgraded to level 50.`
const towerInfo = `To build the tower 7500 stone, 6000 wood, 3000 food, 500 gold, 500 ideas
and 50 idle workers are required. The tower will offer various benefits some permanent some
temporary.`
const castleInfo = `The castle is still in the planning stages and no one is sure what will be
required to build one.`

function welcomeHelp(){
    document.getElementById('help-text').textContent = welcomeInfo
}
welcomeHelp()

function houseHelp(){
    document.getElementById('help-text').textContent = houseInfo
}

function workerHelp(){
    document.getElementById('help-text').textContent = workerInfo

}

function traderHelp(){
    document.getElementById('help-text').textContent = traderInfo
}

function storageHelp(){
    document.getElementById('help-text').textContent = storageInfo
}

function towerHelp(){
    document.getElementById('help-text').textContent = towerInfo

}

function castleHelp(){
    document.getElementById('help-text').textContent = castleInfo
}
