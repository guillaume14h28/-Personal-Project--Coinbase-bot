var utils = require("./Core/Utils");
var coinbase = require("./Core/Coinbase");
var nomics = require("./Indicator/Nomics");
var db = require("./Model/Database");
var moment = require("moment");
var backtest = require("./Core/Backtest");

// coinbase.getSpotPrice("BTC-EUR");
// coinbase.getBuyPrice("BTC-EUR");
// coinbase.getSellPrice("BTC-EUR");

// Récupération de l'indicateur nomics
// nomics.updateNomicsPrediction().then(estimation => {
//     console.log(estimation);
// });

// db.emptyDbBitcoin();
// db.fillDatabaseCurrency("BTC-EUR");

backtest.initBacktest(1, "Y", "ActualStrategy");