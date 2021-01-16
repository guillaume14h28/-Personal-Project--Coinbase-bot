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

        authedClient.getAccounts().then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

    },

    // Retourne l'état des portefeuilles EUR du compte
    getEURWallet : function(){

        authedClient.getAccount("1a55362e-3223-4c03-99a3-5bcad7f57f33").then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

    },

    // Retourne l'état des portefeuilles ETH du compte
    getETHWallet : function(){

        authedClient.getAccount("1eff4579-5ef4-4aa8-ad71-3cfdbf6039cc").then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

    },

    // Retourne l'état des portefeuilles BTC du compte
    getBTCWallet : function(){

        authedClient.getAccount("ac97d333-2ea3-46bd-bf4c-cbc849124a3e").then(data => {
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