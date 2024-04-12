import { worldLogic } from "./game-loop-script.js";
import { LogDisplay } from "./game-loop-script.js";

import * as docElement from './doc-object-script.js';

import { hide } from "./helper-functions.js";
import { redAlert } from "./event-log-script.js";
import { buffer } from "./buff-display-script.js";

// Constants defining costs for various buffs
const BUFF_COSTS = {
    tempBuff: 50,
    permaBuff: 2000,
    goldBuff: 200, 
};

// Constants defining costs and gains for refining ideas
const IDEA_REFINEMENT = {
    cost: 200,
    gain: 5,
};

// Duration of buffs in days
const BUFF_DURATION = 10;
// Maximum level for gold find
const MAX_GOLD_FIND_LEVEL = 50;

// Function to update tower button display based on available ideas
export function updateTowerBtnDisplay() {
    if (worldLogic.idea <= IDEA_REFINEMENT.cost) {
        docElement.refineIdeasBtn.classList.add('unable'); 
    } else {
        docElement.refineIdeasBtn.classList.remove('unable'); 
    }
}

// Function to apply temporary buffs to tower
function applyTowerTempBuff(resourceType, buffName) {
    if (worldLogic.refinedIdeas >= BUFF_COSTS.tempBuff) {
        if (worldLogic.towerBuffProductionStatus[resourceType] == false) {
            worldLogic.towerBuffProductionStatus[resourceType] = true;
            if (buffer.buffs[resourceType].status == false) {
                buffer.buffs[resourceType].status = true; 
                worldLogic.refinedIdeas -= BUFF_COSTS.tempBuff;
                LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/${buffName}.png"></img> ${buffName} buff ${BUFF_DURATION} Days`, 'purple');
            } else {
                redAlert('Buff already active!');
            }
        } else {
            redAlert('Buff already active!');

        }
    }
};

// Event listeners for applying buffs to different resources
docElement.towerFoodBuffBtn.addEventListener('click', () => applyTowerTempBuff('food', 'Farming'));
docElement.towerWoodBuffBtn.addEventListener('click', () => applyTowerTempBuff('wood', 'Lumbering'));
docElement.towerStoneBuffBtn.addEventListener('click', () => applyTowerTempBuff('stone', 'Mining'));
docElement.towerIdeaBuffBtn.addEventListener('click', () => applyTowerTempBuff('idea', 'Thinking'));

// Event listener for refining ideas
docElement.refineIdeasBtn.addEventListener('click', function(e) {
    if (worldLogic.idea <= IDEA_REFINEMENT.cost) {
        LogDisplay.eventLog('Not Enough ideas!', 'red', 'alert'); 
    } else {
        worldLogic.idea -= IDEA_REFINEMENT.cost;
        worldLogic.refinedIdeas += IDEA_REFINEMENT.gain;
        LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/refinedidea.png"></img> Refined 200 Ideas ', 'yellow');
    }
});

// Event listener for applying gold buff
docElement.towerGoldBuffBtn.addEventListener('click', function(e) {
    if (worldLogic.goldFind.level < MAX_GOLD_FIND_LEVEL) {
        if (worldLogic.refinedIdeas >= BUFF_COSTS.goldBuff) {
            worldLogic.goldFind.level++;
            worldLogic.goldFind.chance++;
            worldLogic.refinedIdeas -= BUFF_COSTS.goldBuff; 
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/goldfind.png"></img> Gold Find Chance Increased', 'yellow');
        } else {
            redAlert('Not enough refined ideas');
        }
    } else {
        redAlert('Gold Find Maxed'); 
    }
});

// Event listener for applying house buff
docElement.towerHouseBuffBtn.addEventListener('click', function(e) {
    if (worldLogic.towerUpgradeBuff.houseBuffStatus == false) {
        if (worldLogic.refinedIdeas > BUFF_COSTS.permaBuff) {
            worldLogic.refinedIdeas -= BUFF_COSTS.permaBuff; 
            worldLogic.houseCapacity *= worldLogic.towerUpgradeBuff.houseCapacity;
            worldLogic.maxWorkers *= worldLogic.towerUpgradeBuff.houseCapacity;
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/roomupgrade.png"></img> House Buff Applied`, 'purple');
            worldLogic.towerUpgradeBuff.houseBuffStatus = true;
            buffer.buffs.house.status = true;
        } else {
            redAlert('Not enough refined ideas'); 
        }
    } else {
        redAlert(`House Buff Already Applied`); 
    }
});

// Event listener for applying worker buff
docElement.towerWorkerBuffBtn.addEventListener('click', function(e) {
    if (worldLogic.towerUpgradeBuff.workerBuffStatus == false) {
        if (worldLogic.refinedIdeas > BUFF_COSTS.permaBuff) {
            worldLogic.refinedIdeas -= BUFF_COSTS.permaBuff; 
            worldLogic.workerSpawnRate = 2;
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/twinupgrade.png"></img> Twins Buff Applied`, 'purple');
            worldLogic.towerUpgradeBuff.workerBuffStatus = true;
            buffer.buffs.worker.status = true;
        } else {
            redAlert('Not enough refined ideas'); 
        }
    } else {
        redAlert(`House Buff Already Applied`);
    }
});

// Event listeners for tower exit button
docElement.towerExitBtn.addEventListener('mouseover', function(e) {
    e.target.src = './BasilLand/images/open.png'; 
});

docElement.towerExitBtn.addEventListener('mouseleave', function(e) {
    e.target.src = './BasilLand/images/closed.png'; 
});

docElement.towerExitBtn.addEventListener('click', function(e) {
    hide(docElement.towerDisplay); 
    docElement.openTowerBtn.innerHTML = `Enter Tower`; 
});
