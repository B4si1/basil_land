import { worldLogic } from "./game-loop-script.js";
import { buffer } from "./buff-display-script.js";

import * as docElement from './doc-object-script.js';

import { hide } from "./helper-functions.js";
import { show } from "./helper-functions.js";

import { reset } from "./save-reset-script.js";
import { save } from "./save-reset-script.js";

const BUFF_TYPES = {
    production: 'productionStatus',
    buffbar: 'buffBar',
    perma: 'permaBuffStatus',
    buildings: 'buildings',
}

function LoadHelper(buffType, storageName, loadType, buildingVariable){
    switch(loadType) {
        case BUFF_TYPES.production:
            if (localStorage.getItem(storageName) == 'true'){
                worldLogic.towerBuffProductionStatus[buffType] = true
            }else{
                worldLogic.towerBuffProductionStatus[buffType] = false
            }
          break;
        case BUFF_TYPES.buffbar:
            if(localStorage.getItem(storageName) == 'true'){
                buffer.buffs[buffType].status = true
            }else{
                buffer.buffs[buffType].status = false
            }
          break;
        case BUFF_TYPES.perma:
            if(localStorage.getItem(storageName) == 'true'){
                worldLogic.towerUpgradeBuff[buffType] = true
            }else{
                worldLogic.towerUpgradeBuff[buffType] = false
            } 
          break;
        case BUFF_TYPES.buildings:
            if(localStorage.getItem(storageName) == 0){
                worldLogic[buffType] = buildingVariable;
            }else{
                worldLogic[buffType] = storage(storageName)
                buffType == 'trader' ? traderAndTowerLoadUIHelper('basil-trader') : '';
                buffType == 'tower' ? traderAndTowerLoadUIHelper('basil-tower') : '';
            }
          break;
        default:
          
      }
}

const LOAD_NAMES = ['food', 'wood', 'stone', 'gold', 'idea', 'refinedIdeas', 'workers',
'maxWorkers', 'houseCapacity', 'idleWorkers', 'foodWorkers', 'woodWorkers', 'stoneWorkers', 
'ideaWorkers', 'autosave', 'autosaveEnabled',];

// Load Function to load previous game 
window.onload = function() {
    // Check to see if an instance is stored 
    // If true asign Saved values to Game instance
    // If false Use starting Values (New Game)
    if(localStorage.getItem(`basil-played`) == `true`){

        LOAD_NAMES.forEach(name => {
            worldLogic[name] = storage(`basil-${name}`);
        });


        worldLogic.goldFind.level = localStorage.getItem('basil-tower-gold-buff-level');
        worldLogic.goldFind.chance = localStorage.getItem('basil-tower-gold-buff-chance');
        worldLogic.workerSpawnRate = storage('basil-tower-worker-spawn-rate');
        worldLogic.houseCapacity = storage('basil-tower-house-buff-houseCapacity');
        

        // Production Buff Loaders
        LoadHelper('food', 'basil-tower-food-buff', BUFF_TYPES.production);
        LoadHelper('wood', 'basil-tower-wood-buff', BUFF_TYPES.production);
        LoadHelper('stone', 'basil-tower-stone-buff', BUFF_TYPES.production);
        LoadHelper('idea', 'basil-tower-idea-buff', BUFF_TYPES.production);
        // BuffBar Loaders
        LoadHelper('food', 'basil-buff-farming', BUFF_TYPES.buffbar);
        LoadHelper('wood', 'basil-buff-lumbering', BUFF_TYPES.buffbar);
        LoadHelper('stone', 'basil-buff-mining', BUFF_TYPES.buffbar);
        LoadHelper('idea', 'basil-buff-thinking', BUFF_TYPES.buffbar);
        LoadHelper('house', 'basil-buff-house', BUFF_TYPES.buffbar);
        LoadHelper('worker', 'basil-buff-worker', BUFF_TYPES.buffbar);
        // PermaBuff Ui Loaders
        LoadHelper('houseBuffStatus', 'basil-tower-house-buff', BUFF_TYPES.perma)
        LoadHelper('workerBuffStatus', 'basil-tower-worker-buff', BUFF_TYPES.perma)
        // Building Loaders 
        LoadHelper('workers', 'basil-workers', BUFF_TYPES.buildings, 2)
        LoadHelper('houses', 'basil-houses', BUFF_TYPES.buildings, 1)
        LoadHelper('storage', 'basil-storage', BUFF_TYPES.buildings, 1)
        LoadHelper('worldTime', 'basil-time', BUFF_TYPES.buildings, 0)
        LoadHelper('trader', 'basil-trader', BUFF_TYPES.buildings, 0)
        LoadHelper('tower', 'basil-tower', BUFF_TYPES.buildings, 0)
      
       
    // Set played value to true, so that on load saved values know to load or start fresh
    }else{
        localStorage.setItem(`basil-played`, `true`)
        worldLogic.reset()
        reset()
        save()
    } 
};
// localStorage.clear()

// Trader and Tower Load Helper
export function traderAndTowerLoadUIHelper(type){
    if(type == 'basil-trader'){
        docElement.traderStatusDisplay.classList.remove('upkeep');
        docElement.traderStatusDisplay.innerHTML = `Open!`
        hide(docElement.traderDisplay);
        show(docElement.openTraderBtn);
        show(docElement.traderUpkeep);
    }else{
        docElement.towerStatusDisplay.classList.remove('upkeep');
        docElement.towerStatusDisplay.innerHTML = `Open!`;
        hide(docElement.towerDisplay);
        show(docElement.openTowerBtn);
        show(docElement.towerUpkeep);
    }

};

// Load helper function
function storage(text){
    return Math.floor(localStorage.getItem(text))
}