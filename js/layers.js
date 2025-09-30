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
    exponent: 0.5, // Prestige currency exponent
        gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if (hasUpgrade('p', 21)) mult = mult.times(5)
        if (hasUpgrade('p', 24)) mult = mult.pow(1.1)
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
        return player[this.layer].points.add(1).pow(0.25)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    

        },
        13: {
     title: "Other way around i see?",
    description: "Points boost prestige points.",
    cost: new Decimal(50),
            effect() {
        return player.points.add(1).pow(0.3)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
                          ,14: {
    title: "Develop I, just like in the original",
    description: "Points boost themselves",
    cost: new Decimal(250),
    effect() {
        return player.points.add(1).pow(0.13)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    15: {
    title: "Oh, and i cant forget",
    description: "Prestige points boost themselves",
    cost: new Decimal(1000),
    effect() {
        return player[this.layer].points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
    title: "High yielding.. seeds",
    description: "Multiply seed  gain by 5",
    cost: new Decimal(5000),
        },
        22: {
    title: "More branches",
    description: "Multiply leaf gain by 10",
    cost: new Decimal(10000),
        },
    23: {
    title: "Powers i see?",
    description: "Increase leaves by ^1.1",
    cost: new Decimal(1000000),
        },
    24: {
    title: "Get ready",
    description: "Increase seeds by ^1.1",
    cost: new Decimal(500000000),
        },
    },
    
})
addLayer("F", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
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

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
    
    upgrades: {
        
        // Look in the upgrades docs to see what goes here!
    },
 buyables: {
    11: {
        cost(x) { return new Decimal(1).mul(x) },
        effect(x) {return x.add(1).pow(3)},
        display() { return x },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        
    },
    
}
    
    
})

