import { worldLogic } from "./game-loop-script.js"
import { LogDisplay } from "./game-loop-script.js"

import * as docElement from './doc-object-script.js';

import { buffer } from "./buff-display-script.js"
import { updateDisplay } from "./game-loop-script.js"
import { hide } from "./helper-functions.js";

// Save Button Event Listener
docElement.saveBtn.addEventListener('click', function(e){
    save()
})

// Reset Button Event Listener
docElement.resetBtn.addEventListener('click', function(e){
    reset()
})

// Autosave Checkbox listener
docElement.autosave.addEventListener('change', function(e){
    if(docElement.autosave.value === 'enabled'){
        docElement.autosave.value = 'disabled'
        worldLogic.autosaveEnabled = false
    }else{
        worldLogic.autosaveEnabled = true
        docElement.autosave.value = 'enabled'
    }
})

// Function to check autosave timer
export function autoSave(){
    if(worldLogic.autosave <= 0 && worldLogic.autosaveEnabled == true){
        save('auto')
        worldLogic.autosave = 2;
    }
}

// Save Function
export function save(type){
    localStorage.setItem(`basil-played`, `true`)
    localStorage.setItem(`basil-autosave`, Math.floor(worldLogic.autosave))
    localStorage.setItem(`basil-autosaveEnabled`, worldLogic.autosaveEnabled)
    localStorage.setItem('basil-food', Math.floor(worldLogic.food))
    localStorage.setItem('basil-stone', Math.floor(worldLogic.stone))
    localStorage.setItem('basil-wood', Math.floor(worldLogic.wood))
    localStorage.setItem('basil-idea', Math.floor(worldLogic.idea))
    localStorage.setItem('basil-gold', Math.floor(worldLogic.gold))
    localStorage.setItem('basil-houseCapacity', Math.floor(worldLogic.houseCapacity))
    localStorage.setItem('basil-refinedIdeas', Math.floor(worldLogic.refinedIdeas))
    localStorage.setItem('basil-workers', worldLogic.workers)
    localStorage.setItem('basil-maxWorkers', worldLogic.maxWorkers)
    localStorage.setItem('basil-woodWorkers', worldLogic.woodWorkers)
    localStorage.setItem('basil-foodWorkers', worldLogic.foodWorkers)
    localStorage.setItem('basil-stoneWorkers', worldLogic.stoneWorkers)
    localStorage.setItem('basil-ideaWorkers', worldLogic.ideaWorkers)
    localStorage.setItem('basil-idleWorkers', worldLogic.idleWorkers)
    localStorage.setItem('basil-houses', worldLogic.houses)
    localStorage.setItem('basil-tower', worldLogic.tower)
    localStorage.setItem('basil-tower-wood-buff', worldLogic.towerBuffProductionStatus.wood)
    localStorage.setItem('basil-tower-food-buff', worldLogic.towerBuffProductionStatus.food)
    localStorage.setItem('basil-tower-stone-buff', worldLogic.towerBuffProductionStatus.stone)
    localStorage.setItem('basil-tower-idea-buff', worldLogic.towerBuffProductionStatus.idea)
    localStorage.setItem('basil-tower-food-buff-timer', worldLogic.towerBuffProductionStatus.foodTimer)
    localStorage.setItem('basil-tower-wood-buff-timer', worldLogic.towerBuffProductionStatus.woodTimer)
    localStorage.setItem('basil-tower-stone-buff-timer', worldLogic.towerBuffProductionStatus.stoneTimer)
    localStorage.setItem('basil-tower-idea-buff-timer', worldLogic.towerBuffProductionStatus.ideaTimer)
    localStorage.setItem('basil-tower-gold-buff-level', worldLogic.goldFind.level)
    localStorage.setItem('basil-tower-gold-buff-chance', worldLogic.goldFind.chance)
    localStorage.setItem('basil-tower-house-buff', worldLogic.towerUpgradeBuff.houseBuffStatus)
    localStorage.setItem('basil-tower-house-buff-max-workers', worldLogic.maxWorkers)
    localStorage.setItem('basil-tower-house-buff-houseCapacity', worldLogic.houseCapacity)
    localStorage.setItem('basil-tower-worker-buff', worldLogic.towerUpgradeBuff.workerBuffStatus)
    localStorage.setItem('basil-tower-worker-spawn-rate', worldLogic.workerSpawnRate)
    localStorage.setItem('basil-buff-farming', buffer.buffs.food.status)
    localStorage.setItem('basil-buff-lumbering', buffer.buffs.wood.status)
    localStorage.setItem('basil-buff-mining', buffer.buffs.stone.status)
    localStorage.setItem('basil-buff-thinking', buffer.buffs.idea.status)
    localStorage.setItem('basil-buff-house', buffer.buffs.house.status)
    localStorage.setItem('basil-buff-worker', buffer.buffs.worker.status)
    localStorage.setItem('basil-storage', worldLogic.storage)
    localStorage.setItem('basil-trader', worldLogic.trader)
    localStorage.setItem('basil-time', Math.floor(worldLogic.worldTime))
    if(type == 'auto'){
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/autosave.png"></img> Autosaved', 'orange')
    }else{
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/save.png"></img> Game Saved', 'orange')
    }
    
    LogDisplay.displayEvents()

}

// Reset Function
export function reset(){
    localStorage.setItem(`basil-food`, 20)
    localStorage.setItem(`basil-wood`, 5)
    localStorage.setItem(`basil-stone`, 0)
    localStorage.setItem(`basil-idea`, 0)
    localStorage.setItem(`basil-refinedIdeas`, 0)
    localStorage.setItem(`basil-gold`, 0)
    localStorage.setItem(`basil-houses`, 1)
    localStorage.setItem('basil-houseCapacity', 3)
    localStorage.setItem(`basil-workers`, 2)
    localStorage.setItem(`basil-maxWorkers`, 0)
    localStorage.setItem(`basil-woodWorkers`, 0)
    localStorage.setItem(`basil-foodWorkers`, 0)
    localStorage.setItem(`basil-stoneWorkers`, 0)
    localStorage.setItem(`basil-ideaWorkers`, 0)
    localStorage.setItem(`basil-idleWorkers`, 0)
    localStorage.setItem(`basil-tower`, 0)
    localStorage.setItem(`basil-storage`, 1)
    localStorage.setItem(`basil-trader`, 0)
    localStorage.setItem('basil-tower-food-buff', false)
    localStorage.setItem('basil-tower-wood-buff', false)
    localStorage.setItem('basil-tower-stone-buff', false)
    localStorage.setItem('basil-tower-idea-buff', false)
    localStorage.setItem('basil-tower-food-buff-timer', 10)
    localStorage.setItem('basil-tower-wood-buff-timer', 10)
    localStorage.setItem('basil-tower-stone-buff-timer', 10)
    localStorage.setItem('basil-tower-idea-buff-timer', 10)
    localStorage.setItem('basil-tower-gold-buff-level', 0)
    localStorage.setItem('basil-tower-gold-buff-chance', 1)
    localStorage.setItem('basil-tower-house-buff', false)
    localStorage.setItem('basil-tower-house-buff-max-workers', 0)
    localStorage.setItem('basil-tower-house-buff-houseCapacity', 3)
    localStorage.setItem('basil-tower-worker-buff', false)
    localStorage.setItem('basil-buff-farming', false)
    localStorage.setItem('basil-buff-lumbering', false)
    localStorage.setItem('basil-buff-mining', false)
    localStorage.setItem('basil-buff-thinking', false)
    localStorage.setItem('basil-buff-house', false)
    localStorage.setItem('basil-buff-worker', false)
    localStorage.setItem('basil-tower-worker-spawn-rate', 1)
    localStorage.setItem(`basil-time`, 0)
    localStorage.setItem(`basil-autosave`, 0)
    localStorage.setItem(`basil-autosaveEnabled`, false)
    LogDisplay.reset();
    worldLogic.reset();
    updateDisplay()
    docElement.eventLogDisplay.innerHTML = ''
    // Trader and Tower Resets 
    TraderAndTowerUIResetHelper()
    // Log
    LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/worldreset.png"></img> World Reset', 'orange')
    LogDisplay.displayEvents()
    
}

function TraderAndTowerUIResetHelper(){
    // Trader
    hide(docElement.traderDisplay)
    hide(docElement.openTraderBtn)
    hide(docElement.traderUpkeep)
    docElement.traderStatusDisplay.classList.add('upkeep')
    docElement.traderStatusDisplay.innerHTML = `Closed!`
    //Tower 
    // hide(towerDisplay)
    hide(docElement.openTowerBtn)
    hide(docElement.towerUpkeep)
    docElement.towerStatusDisplay.classList.add('upkeep')
    docElement.towerStatusDisplay.innerHTML = `Unbuilt!`
}
