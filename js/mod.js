let modInfo = {
	name: "The upgrade tree of life",
	author: "e^2",
	pointsName: "Leaves",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "μ∞",
	name: "final update for this",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>μ∞</h3><br>
		left you guys with a new reset layer and bacteria, the inflation is so doomed, goodbye and see you in the better game.
		<h4>μ0.13</h4><br>
		Added P.E + some milestones + new upgrades also changed balancing and layers work.
	<h3>μ0.14</h3><br>
		More P.E upgrades, entropy upgrades. The ultimate balancing of doom has happened, reduced some effects of some seed upgrades and decreased the exponent of fruits from 0.5 --> 0.17, just because of this, fruit upgrades are cheapter. Added cells and 1 new leaf upgrade unlocked by entropy
		<h4>μ0.13</h4><br>
		Added P.E + some milestones + new upgrades also changed balancing and layers work.`
	

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(5)
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
	if (hasUpgrade('p', 17)) gain = gain.times(10)
	if (hasUpgrade('p', 18)) gain = gain.pow(1.1)
	if (hasUpgrade('F', 11)) gain = gain.pow(1.2)
	if (hasUpgrade('F', 21)) gain = gain.pow(upgradeEffect('F', 21)) // placeholder ignore this pls
	if (hasUpgrade('F', 12)) gain = gain.times(upgradeEffect('F', 12))
	if (hasUpgrade('F', 41)) gain = gain.times(buyableEffect('F', 41))
	if (hasUpgrade('p', 27)) gain = gain.times(upgradeEffect('p', 27))
	gain = gain.times(buyableEffect('F', 41))
    if (hasUpgrade('C', 11)) gain = gain.times(upgradeEffect('C', 11))
	if (hasUpgrade('F', 17)) gain = gain.times(5)
	if (hasUpgrade('p', 28)) gain = gain.times(1e4)
	if (hasUpgrade('E', 13)) gain = gain.times(1e10)
	if (hasUpgrade('E', 14)) gain = gain.pow(1.1)
	if (hasUpgrade('p', 31)) gain = gain.pow(1.1)
	if (hasUpgrade('L', 12)) gain = gain.times(1e15)
	if (hasUpgrade('T', 11)) gain = gain.pow(2)
	if (hasUpgrade('T', 11)) gain = gain.times(2e30)
	if (hasUpgrade('T', 12)) gain = gain.pow(30)
	if (hasUpgrade('T', 17)) gain = gain.pow(-1e30)
	
    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}