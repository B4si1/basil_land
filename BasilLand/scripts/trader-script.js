import { worldLogic } from "./game-loop-script.js";
import { LogDisplay } from "./game-loop-script.js";

import { hide } from "./helper-functions.js";
import { redAlert } from "./event-log-script.js";

import * as docElement from './doc-object-script.js';

// Constants defining minimum trade values for resources
const MIN_TRADE_VALUES = {
    food: 101,
    wood: 101,
    stone: 50,
    worker: 1,
    gold: 1,
};

// Constants defining sell prices for resources
const RESOURCE_SELL_PRICE = {
    food: 100,
    wood: 100,
    stone: 50,
    worker: 10,
};

// Constants defining buy prices for resources
const RESOURCE_BUY_PRICE = {
    food: 100,
    wood: 100,
    stone: 100,
    worker: 100,
};

// Storage limit constant
const STORAGE_LIMIT = 99;

// Function to sell a specific resource
function sellResource(resourceType){
    if(worldLogic[resourceType] > MIN_TRADE_VALUES[resourceType]){
        worldLogic[resourceType] -= RESOURCE_SELL_PRICE[resourceType];
        worldLogic.gold++;
        LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Sold ${RESOURCE_SELL_PRICE[resourceType]} ${resourceType} for ${MIN_TRADE_VALUES.gold} gold!`, 'yellow');
    } else {
        redAlert(`Not enough ${resourceType} to sell!`);
    }
}

// Function to buy a specific resource
function buyResource(resourceType){
    if(worldLogic[resourceType] < (worldLogic.townStorage[resourceType] * worldLogic.storage) - STORAGE_LIMIT){
        if(worldLogic.gold >= MIN_TRADE_VALUES.gold){
            worldLogic[resourceType] += RESOURCE_BUY_PRICE[resourceType];
            worldLogic.gold--;
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Bought ${RESOURCE_BUY_PRICE[resourceType]} ${resourceType} for ${MIN_TRADE_VALUES.gold} gold!`, 'yellow');
        } else {
            redAlert('Not enough gold!');
        }
    }else{
        redAlert('Not enough storage!');
    }
}

// Consts to store listeners
const RESOURCES = ['food', 'wood', 'stone'];

// For Loop to assign eventlisteners to the buy resources butttons
RESOURCES.forEach(resource =>{
    docElement[`buy${resource.charAt(0).toUpperCase() + resource.slice(1)}Btn`].addEventListener('click', () => buyResource(resource))
    docElement[`sell${resource.charAt(0).toUpperCase() + resource.slice(1)}Btn`].addEventListener('click', () => sellResource(resource))
});

// Event listener for selling workers
docElement.sellWorkerBtn.addEventListener('click', function(e){
    if(worldLogic.idleWorkers > 0){
        if(worldLogic.workers > MIN_TRADE_VALUES.worker){
            worldLogic.workers--;
            worldLogic.gold += RESOURCE_SELL_PRICE.worker;
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Sold 1 worker for ${RESOURCE_SELL_PRICE.worker} gold!`, 'yellow');
        } else {
            redAlert('Not enough workers!');
        }
    }else{
        redAlert('You may only sell Idle Workers!');
    } 
});

// Event listener for buying workers
docElement.buyWorkerBtn.addEventListener('click', function(e){
    if(worldLogic.gold > RESOURCE_BUY_PRICE.worker){
        if(worldLogic.workers < worldLogic.maxWorkers){
            worldLogic.workers++;
            worldLogic.gold -= RESOURCE_BUY_PRICE.worker; 
            LogDisplay.eventLog(`<img class="log-img-scale" src="./BasilLand/images/trader-seller.png"></img> Bought 1 worker for ${RESOURCE_BUY_PRICE.worker} gold!`, 'yellow');
        } else {
            redAlert('Town at capacity!');
        }
    } else {
        redAlert('Not enough gold!');
    }
});

// Function to update trader button display
export function updateTraderButtonDisplay(){
    traderSellButtonHelper(worldLogic.food, MIN_TRADE_VALUES.food, docElement.sellFoodBtn);
    traderSellButtonHelper(worldLogic.wood, MIN_TRADE_VALUES.wood, docElement.sellWoodBtn);
    traderSellButtonHelper(worldLogic.stone, MIN_TRADE_VALUES.stone, docElement.sellStoneBtn);
    traderSellButtonHelper(worldLogic.idleWorkers, MIN_TRADE_VALUES.worker, docElement.sellWorkerBtn);
    traderBuyButtonHelper(worldLogic.gold, MIN_TRADE_VALUES.gold, docElement.buyFoodBtn);
    traderBuyButtonHelper(worldLogic.gold, MIN_TRADE_VALUES.gold, docElement.buyWoodBtn);
    traderBuyButtonHelper(worldLogic.gold, MIN_TRADE_VALUES.gold, docElement.buyStoneBtn);
    traderBuyButtonHelper(worldLogic.gold, RESOURCE_BUY_PRICE.worker, docElement.buyWorkerBtn);
}

// Helper function to manage disabled state of sell buttons
function traderSellButtonHelper(resource, minresource, button){
    if(resource < minresource){
        button.classList.add('unable');
    } else {
        button.classList.remove('unable');
    }
}

// Helper function to manage disabled state of buy buttons
function traderBuyButtonHelper(gold, minGold, button){
    if(gold < minGold){
        button.classList.add('unable');
    } else {
        button.classList.remove('unable');
    }
}

// Event listeners for trader exit button
docElement.traderExitBtn.addEventListener('mouseover', function(e){
    e.target.src = './BasilLand/images/open.png';
});

docElement.traderExitBtn.addEventListener('mouseleave', function(e){
    e.target.src = './BasilLand/images/closed.png';
});

docElement.traderExitBtn.addEventListener('click', function(e){
    hide(docElement.traderDisplay);
    docElement.openTraderBtn.innerHTML = `Trade`;
});
