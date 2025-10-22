
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
        if (hasUpgrade('F', 14)) mult = mult.pow(1.1)
        if (hasUpgrade('F', 17)) mult = mult.times(5)
        
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
    automate() {
        if(hasMilestone('PEa', 3)) {
            autobuyUpgrades('p')
        }
    },
    passiveGeneration(){
let passive = new Decimal(0)
if (hasMilestone("PEa", 2)) passive = passive.add(1) //5% Prestige Points depending on Reset
return passive
},

    
        upgrades: {
                    11: {
    title: "Welcome",
    description: "Multiply leaves by 5",
    cost: new Decimal(10),
        },
                12: {
    title: "1st synergy",
    description: "Seeds boost leaves.",
    cost: new Decimal(15),
        effect() {
        return player[this.layer].points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    

        },
        13: {
     title: "Other way around i see?",
    description: "Leaves boost seeds.",
    cost: new Decimal(50),
            effect() {
        return player.points.add(1).pow(0.2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
                          ,14: {
    title: "Develop I, just like in the original",
    description: "Leaves boost themselves",
    cost: new Decimal(250),
    effect() {
        let eff = player.points.add(1)
        return eff.pow(0.2)

        
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    15: {
    title: "Oh, and i cant forget",
    description: "Seeds boost themselves",
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
    cost: new Decimal(1e7),
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
        return player[this.layer].points.add(1).pow(0.1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

    },
    27: {
        title: "Potential boost",
        description: "Potential energy boosts leaves",
        cost: new Decimal(1e23),
         effect() {
        return player.PE.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
        
    },

    },
     28: {
        title: "Enough of potential energy",
        description: "x1e4 leaves, just for the balance :D",
        cost: new Decimal(1e40),
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

    requires: new Decimal(1e7),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.17,                  // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let gain = new Decimal(1)
        if (hasUpgrade('F', 13)) gain = gain.times(2.71)
        if (hasUpgrade('F', 17)) gain = gain.times(5)   // Factor in any bonuses multiplying gain here.
        if (hasUpgrade('L', 11)) gain = gain.times(10)
        return gain
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    passiveGeneration(){
let passive = new Decimal(0)
if (hasMilestone("PEa", 5)) passive = passive.add(1) //5% Prestige Points depending on Reset
return passive
},
autobuyUpgrades() {
        false
        if(hasMilestone('PEa', 1)) { return true}
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
            cost: new Decimal(10),
            effect() {
        return player[this.layer].points.add(1).pow(0.3)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },
        13: {
            title: "Best number real",
            description: "x2.71 fruit gain",
            cost: new Decimal(30),
        },
        14: {
            title: "Almost real energy",
            description: "Unlock Potential Energy, increase seed gain by ^1.05",
            cost: new Decimal(300),
        },
        15: {
            title: "Higher position",
            description: "Boost potential energy by x10 again",
            cost: new Decimal(1000),
        },
         16: {
            title: "Also that other factor",
            description: "Potential energy is boosted based on fruits",
            cost: new Decimal(20000),
            effect() {
            return player[this.layer].points.add(1).pow(0.2)
            
  
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    
    },
        },
        17: {
            title: "Speeding things up",
            description: "Increase LSF (leaf, seeds and fruits) by x5",
            cost: new Decimal(30000)
        },
        18: {
            title: "Discover the chaos",
            description: "x300 P.E",
            cost: new Decimal(1e15)
        },
        
    


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
    return Decimal.pow(2, amount).add(1);
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
    row: 4,                                 // The row this layer is on (0 is the first row).

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
        if (upgradeEffect('F', 16) > 1e6) mult = mult.log10(upgradeEffect('F', 16))
        if (hasUpgrade('F', 18)) mult = mult.times(300)
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    passiveGeneration(){
let passive = new Decimal(0)
if (hasUpgrade("F", 14)) passive = passive.add(1) //5% Prestige Points depending on Reset
return passive
},

    layerShown() { false 
        if(hasUpgrade('F', 14)) return true
        if(player.PE.points >= 1) return true
        
    },          // Returns a bool for if this layer's node should be visible in the tree.
    milestonePopups: false,
    
    clickables: {
    11: {
        display() { return `Potential Energy will be used to gain entropy and some QOL milestones. It does not have any upgrades tied to it. <br> btw you cant buy this upgrade`},
        title: "woah look info (please dont do that P.E reset)"
    }
    
},
milestones: {
    // oh btw id 1 is skipped cuz that was originally how you generated 100% of P.E
     2: {
        requirementDescription: "Get 500 P.E",
        effectDescription: "Gain 100% of seeds on reset.", // be grateful this used to be 50000 P.E
        done() { return player.PE.points.gte(500) }
    },
     3: {
        requirementDescription: "Get 1,000,000 P.E",
        effectDescription: "Automate seed upgrades.",
        done() { return player.PE.points.gte(1e6)}
    },
     4: {
        requirementDescription: "Get 1e25 P.E",
        effectDescription: "Unlock Entropy",
        done() { return player.PE.points.gte(1e25) }
     },
     5: {
        requirementDescription: "Get 1e150 P.E",
        effectDescription: "Generate 100% of fruits on reset",
        done() { return player.PE.points.gte(1e150) }
     },
     6: {
        requirementDescription: "Get 1e1024 P.E",
        effectDescription: "Unlock the weather conditions (W.I.P)",
        done() { return player.PE.points.gte(1e1024) }
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
    row: 5,                                 // The row this layer is on (0 is the first row).

    baseResource: "Potential Energy",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.PE.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e25),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.01,
                // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {  false
        if(hasMilestone('PEa', 4)) return true
        if(player.E.points >= 1) return true },          // Returns a bool for if this layer's node should be visible in the tree.
        clickables: {
        11: {
            title: "oh btw you keep P.E milestones. Its in the form of those green notifications dw",
            description: "hi",
        }

    },

    upgrades: {
        11:{
            title: "Zoom in real hard",
            description: "Unlock the cells",
            cost: new Decimal(1),
        },
        12:{
            title: "Eons and Eons",
            description: "Unlock leaf upgrades (MUST HAVE THE 1ST UPGRADE OTHERWISE NO EFFECT)",
            cost: new Decimal(1),
        }
    },
    
    
 
 
})
addLayer("C", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#f0f0f0ff",                       // The color for this layer, which affects many elements.
    resource: "Cells",            // The name of this layer's main prestige resource.
    row: 5,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,           // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let gain = new Decimal(1);
        gain = gain.times(buyableEffect('C', 11))
        if(player.C.points > 1.79e308) gain = gain.times(0)
        
        
        return gain           // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { false
        if(hasUpgrade('E', 11)) { return true}
     },          // Returns a bool for if this layer's node should be visible in the tree.
    
    passiveGeneration(){
let passive = new Decimal(0)
if (hasUpgrade('E', 11)) passive = passive.add(1)
    return passive},

 

    buyables: {
    11: {
        cost(amount) { return Decimal.pow(2, amount) },
        title: "Increase cell gain by x2",
        display() { return `<br>Amount: ${format(getBuyableAmount(this.layer, this.id))}<br>Current Cost: ${format(this.cost())} <br> Current Effect: ${format(buyableEffect(this.layer, this.id))}` },
        canAfford() { return player.E.points.gte(this.cost()) },
        buy() {
            player.E.points = player.E.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(amount) {
    return Decimal.pow(2, amount).add(1);
  }
},
    

        
    },
    clickables: {
        11: {
            title: "Cells are hardcapped at 1.79e308",
            
        },
        12: {
            title: "You do not need to do a reset for cells, they are generated based on ^1.5 your leaves"
        }
    },
    upgrades: {
        11:{
            title: "Cellular leaves",
            description: "Boost leaves based on leaves",
            cost: new Decimal(1),
             effect() {
        return player.C.points.log10(player.C.points + 1)
        
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }
    },
    
    
})
addLayer("A", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ffef0fff",                       // The color for this layer, which affects many elements.
    resource: "Achievements",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).
    type: "none",                         // Determines the formula used for calculating prestige currency.
    tooltip: "Achievements",
    achievements:{
         11: {
            name: "The start",
            done() { return player.points.gte(10) },
            tooltip: "Get 10 leaves.",
            
        },
    }
})
addLayer("PEa", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#fbff02ff",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: 500,                                 // The row this layer is on (0 is the first row).

    baseResource: "leaves",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return false },          // Returns a bool for if this layer's node should be visible in the tree.

    

    milestones: {
    // oh btw id 1 is skipped cuz that was originally how you generated 100% of P.E
     2: {
        requirementDescription: "Get 500 P.E",
        effectDescription: "Gain 100% of seeds on reset.", // be grateful this used to be 50000 P.E
        done() { return player.PE.points.gte(500) }
    },
     3: {
        requirementDescription: "Get 1,000,000 P.E",
        effectDescription: "Automate seed upgrades.",
        done() { return player.PE.points.gte(1e6)}
    },
     4: {
        requirementDescription: "Get 1e25 P.E",
        effectDescription: "Unlock Entropy",
        done() { return player.PE.points.gte(1e25) }
     },
     5: {
        requirementDescription: "Get 1e150 P.E",
        effectDescription: "Generate 100% of fruits on reset",
        done() { return player.PE.points.gte(1e150) }
     },
     6: {
        requirementDescription: "Get 1e1024 P.E",
        effectDescription: "Unlock the weather conditions (W.I.P)",
        done() { return player.PE.points.gte(1e1024) }
     }
}
})

addLayer("L", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#48ff00ff",                       // The color for this layer, which affects many elements.
    resource: "stats that really dont matter but exist for technical reasons",            // The name of this layer's main prestige resource
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "Leaves",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { false
        if(hasUpgrade('E', 11), hasUpgrade('E', 12)) { return true}
     },          // Returns a bool for if this layer's node should be visible in the tree.
    

    upgrades: {
        11:{
            title: "Suprising",
            description: "Dont think these upgrades are cheap! They are very expensive with GREAT value! How about we start with x10 fruits? Since the fruit economy is really bad...",
            currencyDisplayName: "Leaves",
            currencyInternalName: "points",
            cost: new Decimal(1e100),
            
    }
    }
})
