addLayer("p", {
    name: "Seeds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(10),
    }},
    color: "#4BDC13",
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
    cost: new Decimal(1),
        },
                12: {
    title: "1st synergy",
    description: "Prestige points boost points.",
    cost: new Decimal(5),
        effect() {
        return player[this.layer].points.add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    

        },
        13: {
     title: "Other way around i see?",
    description: "Points boost prestige points.",
    cost: new Decimal(5),
            effect() {
        return player.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
                          ,14: {
    title: "Develop I, just like in the original",
    description: "Multiply point gain by 5",
    cost: new Decimal(1),
    effect() {
        return player[this.layer].points.add(1).pow(0.25)
    },
    effectDisplay() { return format(upgradeEffect(points, points))+"x" }, // Add formatting to the effect
        },
    },
})
