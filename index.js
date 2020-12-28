var utils = require("./Core/Utils");
var coinbase = require("./Core/Coinbase");
var nomics = require("./Indicator/Nomics");
var db = require("./Model/Database");
var moment = require("moment");

coinbase.getAllWallet();

// coinbase.getSpotPrice("BTC-EUR");
// coinbase.getBuyPrice("BTC-EUR");
// coinbase.getSellPrice("BTC-EUR");

// Récupération de l'indicateur nomics
// nomics.updateNomicsPrediction().then(estimation => {
//     console.log(estimation);
// });

// db.emptyDbBitcoin();
// db.fillDatabaseCurrency("BTC-EUR");
// db.getLastValue("BTC-EUR").then(data => {
//     console.log(data.date);
// });