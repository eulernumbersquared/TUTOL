addLayer("p", {
    name: "Seeds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(10),
    }},
    color: "#b84107",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Seeds", // Name of prestige currency
    baseResource: "Leaves", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
        gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if (hasUpgrade('p', 16)) mult = mult.times(5)
        if (hasUpgrade('p', 24)) mult = mult.pow(1.1)
        if (hasUpgrade('F', 11)) mult = mult.pow(1.2)
        if (hasUpgrade('F', 13)) mult = mult.times(2.71)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "S: Decomplize for some seeds", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration(){
let passive = new Decimal(0)
if (hasMilestone("PE", 2)) passive = passive.add(1) //5% Prestige Points depending on Reset
return passive
},

    
        upgrades: {
                    11: {
    title: "Welcome",
    description: "Multiply point gain by 5",
    cost: new Decimal(10),
        },
                12: {
    title: "1st synergy",
    description: "Prestige points boost points.",
    cost: new Decimal(15),
        effect() {
        return player[this.layer].points.add(1).pow(0.2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    

        },
        13: {
     title: "Other way around i see?",
    description: "Points boost prestige points.",
    cost: new Decimal(50),
            effect() {
        return player.points.add(1).pow(0.2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
                          ,14: {
    title: "Develop I, just like in the original",
    description: "Points boost themselves",
    cost: new Decimal(250),
    effect() {
        let eff = player.points.add(1)
        return eff.pow(0.2)

        
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    15: {
    title: "Oh, and i cant forget",
    description: "Prestige points boost themselves",
    cost: new Decimal(1000),
    effect() {
        return player[this.layer].points.add(1).pow(0.1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        16: {
    title: "High yielding.. seeds",
    description: "Multiply seed  gain by 5",
    cost: new Decimal(5000),
        },
        17: {
    title: "More branches",
    description: "Multiply leaf gain by 10",
    cost: new Decimal(10000),
        },
    18: {
    title: "Powers i see?",
    description: "Increase leaves by ^1.1",
    cost: new Decimal(1000000),
        },
    24: {
    title: "Get ready",
    description: "Increase seeds by ^1.1",
    cost: new Decimal(500000000),
        },
    25: {
        title: "Potential boost",
        description: "Boost potential energy by x10",
        cost: new Decimal(1e20),
    },
    26: {
        title: "Really needed that extra factor",
        description: "Boost potential energy based on seeds",
        cost: new Decimal(1e22),
         effect() {
        return player.PE.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

    },
    27: {
        title: "Potential boost",
        description: "Potential energy boosts leaves",
        cost: new Decimal(1e26),
         effect() {
        return player.PE.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

    },
       
    },
    
    
})
addLayer("F", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,         // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "rgba(211, 26, 26, 1)",                       // The color for this layer, which affects many elements.
    resource: "Fruits",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Seeds",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e9),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { false 
        if(hasUpgrade('p', 24)) return true
        if(player.F.points >= 1) return true
        if(hasUpgrade('F', 11)) return true
    },          // Returns a bool for if this layer's node should be visible in the tree.
    
    
    upgrades: {
        
        11: {
            title: "MASSIVE boost",
            description: "Increase leaves and seeds by ^1.1",
            cost: new Decimal(1),
        },
        12: {
            title: "Fruits /= leaves",
            description: "Fruits boost leaves gain.",
            cost: new Decimal(400),
            effect() {
        return player[this.layer].points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },
        13: {
            title: "Best number real",
            description: "x2.71 seed gain",
            cost: new Decimal(1000),
        },
        14: {
            title: "Almost real energy",
            description: "Unlock Potential Energy",
            cost: new Decimal(5000),
        },
        15: {
            title: "Higher position",
            description: "Boost potential energy by x10 again",
            cost: new Decimal(1e6),
        },
         16: {
            title: "Also that other factor",
            description: "Potential energy is boosted based on fruits",
            cost: new Decimal(1e10),
            effect() {
        return player.PE.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
        
    


    },
    automate() {
  if (hasMilestone("PE", 3)) {
    buyUpgrade("p", 11)
buyUpgrade("p", 12)
buyUpgrade("p", 13)
buyUpgrade("p", 14)
buyUpgrade("p", 15)
buyUpgrade("p", 16)
buyUpgrade("p", 17)
buyUpgrade("p", 18)
buyUpgrade("p", 24)
buyUpgrade("p", 25)
buyUpgrade("p", 26)
buyUpgrade("p", 27)


    

  }
},
buyables: {
    41: {
        cost(amount) { return Decimal.pow(1000, amount) },
        title: "Composter I",
        display() { return `Boost leaves by 1.5 compounding<br>Amount: ${format(getBuyableAmount(this.layer, this.id))}<br>Current Cost: ${format(this.cost())} <br> Current Effect: ${format(buyableEffect(this.layer, this.id))}` },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(amount) {
    return Decimal.pow(1.5, amount).add(1);
  }
        
    },
    
}

    
}
)
addLayer("PE", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#362adbff",                       // The color for this layer, which affects many elements.
    resource: "Potential Energy",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Leaves",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points},  // A function to return the current amount of baseResource.

    requires: new Decimal(1e15),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if (hasUpgrade('p', 25)) mult = mult.times(10)
        if (hasUpgrade('F', 15)) mult = mult.times(10)
        if (hasUpgrade('p', 26)) mult = mult.times(upgradeEffect('p', 26))
        if (hasUpgrade('F', 16)) mult = mult.times(upgradeEffect('F', 16))
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    passiveGeneration(){
let passive = new Decimal(0)
if (hasMilestone("PE", 1)) passive = passive.add(1) //5% Prestige Points depending on Reset
return passive
},

    layerShown() { false 
        if(hasUpgrade('F', 14)) return true
        if(player.PE.points >= 1) return true
        
    },          // Returns a bool for if this layer's node should be visible in the tree.
    
    clickables: {
    11: {
        display() { return `Potential Energy will be used to gain entropy and some QOL milestones. It does not have any upgrades tied to it. <br> btw you cant buy this upgrade`},
        title: "woah look info"
    }
    
},
milestones: {
    1: {
        requirementDescription: "Preform P.E reset once",
        effectDescription: "Gain 100% of P.E on reset.",
        done() { return player.PE.points.gte(1) }
    },
     2: {
        requirementDescription: "Get 50,000 P.E",
        effectDescription: "Gain 100% of seeds on reset.",
        done() { return player.PE.points.gte(50000) }
    },
     3: {
        requirementDescription: "Get 1,000,000 P.E",
        effectDescription: "Automate seed upgrades.",
        done() { return player.PE.points.gte(1e6)}
    },
     4: {
        requirementDescription: "Get 1e20 P.E",
        effectDescription: "Unlock Entropy",
        done() { return player.PE.points.gte(1e20) }
     }
}
})
addLayer("E", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#e7e7e7ff",                       // The color for this layer, which affects many elements.
    resource: "Entropy",            // The name of this layer's main prestige resource.
    row: 4,                                 // The row this layer is on (0 is the first row).

    baseResource: "Potential Energy",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.PE.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e20),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {  false
        if(hasMilestone('PE', 4)) return true
        if(player.E.points >= 1) return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    
    
 
 
})
