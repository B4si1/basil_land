import { LogDisplay } from "./game-loop-script.js";

import * as docElement from './doc-object-script.js';


// World Logic Class
export class WorldLogic{
    constructor() {
        // World Time and Autosave
        this.worldTime = 0;
        this.autosave = 2;
        this.autosaveEnabled = false;
    
        // Resources
        this.wood = 5;
        this.stone = 0;
        this.food = 20;
        this.idea = 0;
        this.gold = 0;
    
        // Workers
        this.workers = 0;
        this.maxWorkers = 0;
        this.foodWorkers = 0;
        this.stoneWorkers = 0;
        this.woodWorkers = 0;
        this.ideaWorkers = 0;
        this.idleWorkers = 0;
    
        // Worker Costs
        this.workerCost = {
            food: 200,
            idles: 2,
        };
    
        // Spawning
        this.spawn = false;
        this.workerSpawnRate = 1;
    
        // Economy
        this.taxes = 1;
        this.townUpkeep = {
            worker: 3,
            houses: 0.5,
            trader: {
                wood: 20,
                stone: 10,
            },
            tower: {
                stone: 30,
                ideas: 50,
            }
        };
    
        // Houses
        this.houses = 1;
        this.houseCapacity = 3;
        this.housesCost = {
            stone: 20,
            wood: 300,
            idleWorkers: 1,
        };
        this.buildHouse = false;
        
        // Health
        this.workerHealth = 2;
        this.houseHealth = 2;
    
        // Storage
        this.storage = 1;
        this.storageCost = {
            wood: 200,
            stone: 500,
            idleWorkers: 3,
        };
        this.buildStorage = false;
        this.townStorage = {
            food: 1000,
            wood: 750,
            stone: 750,
        };
    
        // Trader
        this.trader = 0;
        this.traderCost = {
            food: 2000,
            wood: 1000,
            stone: 500,
            idleWorkers: 6,
        };
        this.buildTrader = false;
    
        // Tower
        this.tower = 0;
        this.towerCost = {
            food: 3000,
            wood: 6000,
            stone: 7500,
            gold: 500,
            idea: 500,
            idleWorkers: 50,
        };
        this.buildTower = false;
        this.refinedIdeas = 0;
    
        // Tower Buffs
        this.towerBuffCosts = {
            twins: 500,
            houseCapacity: 500,
            goldFindChance: 200,
        };
        this.baseGoldFindChance = 20000;
        this.goldFind = {
            level: 0,
            levelmax: 50,
            chance: 2,
        };
        this.towerBuffProductionStatus = {
            food: false,
            foodTimer: 10,
            wood: false,
            woodTimer: 10,
            stone: false,
            stoneTimer: 10,
            idea: false,
            ideaTimer: 10,
        };
        this.towerUpgradeBuff = {
            workerBuffStatus: false,
            houseBuffStatus: false,
            workerSpawn: 2,
            houseCapacity: 2,
        };
    
        // Castle
        this.castle = 0;
        this.buildCastle = false;
        this.castleCost = {
            stone: 37000,
            wood: 30000,
            food: 20000,
            gold: 5000,
            idleWorkers: 50,
        };
    }
    
    updateTime() {
        // Increment world time
        this.worldTime += 0.001;
        // Update taxes and autosave countdown
        this.taxes -= 0.001;
        this.autosave -= 0.001;
    }
    
    addPurple(Display, Btn) {
        // Add purple class to display and button elements
        Display.classList.add('purple');
        Btn.classList.add('purple-btn');
        Btn.innerHTML = `Buffed`;
    }
    
    removePurple(Display, Btn) {
        // Remove purple class from display and button elements
        Display.classList.remove('purple');
        Btn.classList.remove('purple-btn');
        Btn.innerHTML = `Buff`;
    }
    
    addPurplePerma(Display, Btn) {
        // Add purple class to display and button elements for permanent buffs
        Display.classList.add('purple-non-event');
        Btn.classList.add('purple-btn');
        Btn.innerHTML = `Applied!`;
    }
    
    removePurplePerma(Display, Btn) {
        // Remove purple class from display and button elements for permanent buffs
        Display.classList.remove('purple-non-event');
        Btn.classList.remove('purple-btn');
        Btn.innerHTML = `Research`;
    }
    
    handleBuff(buffType, display, button, timer, expirationMessage) {
        // Handle buffs based on their type
        if (this.towerBuffProductionStatus[buffType]) {
            this.addPurple(display, button);
            this.towerBuffProductionStatus[buffType + "Timer"] -= 0.001;
        }
        if (this.towerBuffProductionStatus[buffType + "Timer"] < 0) {
            this.removePurple(display, button);
            this.towerBuffProductionStatus[buffType] = false;
            this.towerBuffProductionStatus[buffType + "Timer"] = 10;
            LogDisplay.eventLog(expirationMessage, 'purple');
        }
    }
    
    handlePermanentBuff(buffStatus, display, button) {
        // Handle permanent buffs based on their status
        if (buffStatus) {
            this.addPurplePerma(display, button);
        } else {
            this.removePurplePerma(display, button);
        }
    }
    
    updateBuffTimes() {
        // Update buff times for various buffs
        this.handleBuff("food", docElement.foodDisplay, docElement.towerFoodBuffBtn, "food", '<img class="log-img-scale" src="./BasilLand/images/farmingminu.png"></img> Farming buff expired');
        this.handleBuff("wood", docElement.woodDisplay, docElement.towerWoodBuffBtn, "wood", '<img class="log-img-scale" src="./BasilLand/images/lumberingminu.png"></img> Lumbering buff expired');
        this.handleBuff("stone", docElement.stoneDisplay, docElement.towerStoneBuffBtn, "stone", '<img class="log-img-scale" src="./BasilLand/images/miningminu.png"></img> Mining buff expired');
        this.handleBuff("idea", docElement.ideaDisplay, docElement.towerIdeaBuffBtn, "idea", '<img class="log-img-scale" src="./BasilLand/images/thinkingminu.png"> Thinking buff expired </img>');
    
        // Check if gold find level has reached maximum
        if (this.goldFind.level >= this.goldFind.levelmax) {
            docElement.towerGoldBuffBtn.innerHTML = `Maxed!`;
            docElement.towerGoldBuffBtn.style.backgroundColor = 'orange';
        }
    
        // Handle permanent buffs
        this.handlePermanentBuff(this.towerUpgradeBuff.houseBuffStatus, docElement.housesDisplay, docElement.towerHouseBuffBtn);
        this.handlePermanentBuff(this.towerUpgradeBuff.workerBuffStatus, docElement.workersDisplay, docElement.towerWorkerBuffBtn);
    }
    
    updateResources() {
        // Function to update resource quantities
        const handleResourceBuff = (buffStatus, baseProduction, additionalProduction, workers) => {
            return buffStatus ? (baseProduction + additionalProduction) * workers : baseProduction * workers;
        };
    
        this.food += handleResourceBuff(this.towerBuffProductionStatus.food, 0.01, 0.09, this.foodWorkers);
        this.wood += handleResourceBuff(this.towerBuffProductionStatus.wood, 0.01, 0.09, this.woodWorkers);
        this.stone += handleResourceBuff(this.towerBuffProductionStatus.stone, 0.01, 0.09, this.stoneWorkers);
        this.idea += handleResourceBuff(this.towerBuffProductionStatus.idea, 0.002, 0.018, this.ideaWorkers);
    
        // Check for gold discovery by stone workers
        if (this.stoneWorkers > 0 && Math.floor(Math.random() * ((this.baseGoldFindChance / this.goldFind.chance) - this.stoneWorkers) - 1) === 1) {
            this.gold++;
            LogDisplay.eventLog('<img class="log-img-scale" src="./BasilLand/images/gold.png"></img> Found Gold!', 'yellow');
        }
    
        // Check for resource shortages and apply storage limits
        if (this.food < 0) {
            LogDisplay.eventLog('Food Low!', 'red', 'alert');
            this.food = 0;
        }
        if (this.wood < 0) {
            LogDisplay.eventLog('Wood Low!', 'red', 'alert');
            this.wood = 0;
        }
        if (this.stone < 0) {
            LogDisplay.eventLog('Stone Low!', 'red', 'alert');
            this.stone = 0;
        }
        if (this.idea < 0) {
            this.idea = 0;
        }
    
        this.food = Math.min(this.food, this.townStorage.food * this.storage);
        this.wood = Math.min(this.wood, this.townStorage.wood * this.storage);
        this.stone = Math.min(this.stone, this.townStorage.stone * this.storage);
    }
    
    updateWorkers() {
        // Calculate idle workers
        this.idleWorkers = this.workers - this.foodWorkers - this.stoneWorkers - this.woodWorkers - this.ideaWorkers;
    
        // Check if taxes are due
        if (this.taxes <= 0) {
            // Deduct upkeep costs
            this.food -= this.townUpkeep.worker * (this.workers - this.idleWorkers);
            this.wood -= this.townUpkeep.houses * this.houses;
    
            // Deduct tower upkeep if tower is built
            if (this.tower == 1) {
                this.idea -= this.townUpkeep.tower.ideas;
                this.stone -= this.townUpkeep.tower.stone;
            }
    
            // Deduct trader upkeep if trader is built
            if (this.trader == 1) {
                this.wood -= this.townUpkeep.trader.wood;
                this.stone -= this.townUpkeep.trader.stone;
            }
    
            // Reset taxes
            this.taxes = 1;
        }
    
        // Check for starvation and reduce worker health
        if (this.food == 0) {
            this.workerHealth -= 0.001;
        }
    
        // Check if worker health is critically low and reduce worker count
        if (this.workerHealth < 1 && this.workers >= 1) {
            // Reset worker types and decrease worker count
            this.foodWorkers = 0;
            this.woodWorkers = 0;
            this.stoneWorkers = 0;
            this.ideaWorkers = 0;
            this.workers--;
    
            // Log worker death
            LogDisplay.eventLog('Worker Died!', 'red', 'alert');
    
            // Reset worker health
            this.workerHealth = 2;
        }
    
        // Check for wood shortage and reduce house health
        if (this.wood == 0) {
            this.houseHealth -= 0.001;
        }
    
        // Check if house health is critically low and reduce house count
        if (this.houseHealth < 1 && this.houses >= 1) {
            // Reset worker types and decrease house count
            this.foodWorkers = 0;
            this.woodWorkers = 0;
            this.stoneWorkers = 0;
            this.ideaWorkers = 0;
            this.houses--;
    
            // Log house collapse
            LogDisplay.eventLog('House Collapsed!', 'red', 'alert');
    
            // Decrease worker count by 3
            this.workers -= 3;
    
            // Reset house health
            this.houseHealth = 2;
        }
    
        // Ensure worker and house counts are non-negative
        this.workers = Math.max(this.workers, 0);
        this.houses = Math.max(this.houses, 0);
    }
    
    
    checkFailConditions() {
        // Check for failure conditions
        if (this.workers == 0 && this.idleWorkers == 0) {
            LogDisplay.eventLog('All Workers are Dead!', 'red', 'alert');
        }
        if (this.houses == 0) {
            LogDisplay.eventLog('All Houses Collapsed!', 'red', 'alert');
        }
    }

    // Function to track the max workers allowed
    updateHouses(){
        this.maxWorkers = this.houses * this.houseCapacity
    }

    // Function to check requirements to spawn new Worker
    checkSpawnCondition(){
        if(this.food >= this.workerCost.food &&
            this.idleWorkers >= this.workerCost.idles &&
            this.maxWorkers > this.workers){
            return this.spawn = true;
        }else{
            return this.spawn = false;
        }
    }

    // Function to check requirements for new house
    checkHouseBuildCondition(){
        if(this.wood >= this.housesCost.wood && 
            this.stone >= this.housesCost.stone && 
            this.idleWorkers >= this.housesCost.idleWorkers){
            return this.buildHouse = true;
        }else{
            return this.buildHouse = false;
        } 
    }
    
    // Function to check requirements for new storage
    checkStorageBuildCondition(){
        if(this.stone >= this.storageCost.stone && 
            this.wood >= this.storageCost.wood && 
            this.idleWorkers >= this.storageCost.idleWorkers){
            return this.buildStorage = true;
        }else{
            return this.buildStorage = false;
        }
    }

    checkTraderBuildCondition(){
        if(this.trader < 1 &&
            this.stone >= this.traderCost.stone && 
            this.wood >= this.traderCost.wood && 
            this.food >= this.traderCost.food &&
            this.idleWorkers >= this.traderCost.idleWorkers){
            return this.buildTrader = true;
        }else{
            return this.buildTrader = false;
        }
    }

    // Function to check requirements for new tower
    checktowerBuildConsition(){
        if(this.tower < 1 &&
            this.stone >= this.towerCost.stone && 
            this.wood >= this.towerCost.wood && 
            this.food >= this.towerCost.food && 
            this.gold >= this.towerCost.gold &&
            this.idea >= this.towerCost.idea &&
            this.idleWorkers >= this.towerCost.idleWorkers){
            return this.buildtower = true;
        }else{
            return this.buildtower = false;
        }
    }

    // World Reset Function
    reset(){
        this.wood = 5;
        this.stone = 0;
        this.food = 20;
        this.idea = 0;
        this.gold = 0;
        this.refinedIdeas = 0;
        this.houses = 1;
        this.workers = 2;
        this.idleWorkers = 2;
        this.foodWorkers = 0;
        this.stoneWorkers = 0;
        this.woodWorkers = 0;
        this.ideaWorkers = 0;
        this.maxWorkers = 0;
        this.tower = 0;
        this.storage = 1;
        this.trader = 0;
        this.worldTime = 0;
        this.towerBuffProductionStatus.food = false
        this.towerBuffProductionStatus.wood = false
        this.towerBuffProductionStatus.stone = false
        this.towerBuffProductionStatus.idea = false
        this.towerBuffProductionStatus.foodTimer = 10
        this.towerBuffProductionStatus.woodTimer = 10
        this.towerBuffProductionStatus.stoneTimer = 10
        this.towerBuffProductionStatus.ideaTimer = 10
        this.goldFind.level = 0
        this.goldFind.chance = 1
        this.towerUpgradeBuff.houseBuffStatus = false;
        this.towerUpgradeBuff.workerBuffStatus = false;
        this.workerSpawnRate = 1;
        this.houseCapacity = 3;
    }

    // Function to handle all the calls for the World Logic Functions
    handleEvents(){
        this.updateTime()
        this.updateBuffTimes()
        this.updateResources()
        this.updateHouses()
        // this.checkFailConditions()
        this.checkSpawnCondition()
        this.checkHouseBuildCondition()
        this.checkStorageBuildCondition()
        this.checkTraderBuildCondition()
        this.checktowerBuildConsition()    
        this.updateWorkers()
    }
}
