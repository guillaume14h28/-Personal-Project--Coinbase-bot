var Utils = require("./Utils");
var moment = require("moment");
var config = Utils.getConfig().ApiCoinbasePro
const CoinbasePro = require('coinbase-pro');

const publicClient = new CoinbasePro.PublicClient();
const authedClient = new CoinbasePro.AuthenticatedClient(
    config.apiKey, 
    config.apiSecret, 
    config.passphrase, 
    config.apiURI
);


module.exports = {

    // Retourne l'état des portefeuilles du compte
    getAllWallet : function(){

        authedClient.getAccounts(config.accountID).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

    },

    // Retourne un tableau contenant l'historique de la crypto
    // Array [time, low, high, open, close, volume]
    getHistoryByCurrency : async function(currency, start, end, granularity){

        return authedClient.getProductHistoricRates(currency, { start: start ,end: end, granularity: granularity }).then(data => {
            return data;
        }).catch(err => {
            console.log(err);
            return false;
        });

    },

    getCurrentStatByCurrency : async function(currency){

        return authedClient.getProductHistoricRates(currency, { start: moment().subtract(1, "hour").startOf("hour").toISOString() ,end: moment().startOf("hour").toISOString(), granularity: 3600}).then(data => {
            return data;
        }).catch(err => {
            console.log(err);
            return false;
        });

    },
}