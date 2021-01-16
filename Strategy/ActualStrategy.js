var ema = require("../Indicator/Ema");
var rsi = require("../Indicator/Rsi");
var utils = require("../Core/Utils");

const config = {
    highest : 0,
    lowest : 0,
    periode : 24,
    memory : [],
    result : 0,
    limiteSell : 5,
    fees : 1,
    countTrans : 0
}

const backtestMemo = {
    inUse : false,
    valueAtBuy : 0
}

module.exports = {

    // Initialisation des variables de la strategie
    init : function(){
        // TODO
    },

    // Active la stratégie en mode backtest
    backtestCheck : async function(currency, data){

        if(config.memory.length > config.periode){
            config.memory.shift();
            config.memory.push({date : data.date, value : data.close});
            config.highest = 0;
            config.lowest = 9999999999999;

            for(row of config.memory){
                if(row.value < config.lowest){
                    config.lowest = row.value;
                }
                if(row.value > config.highest){
                    config.highest = row.value;
                }
            }
            
            if(backtestMemo.inUse == true && data.close >= config.highest && data.close > backtestMemo.value){
                console.log(data.date);
                console.log("Vente effectuée : " + data.close);
                console.log("Différence : " + (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) -1) + "%");
                config.result += utils.getPercentDiff(data.close, backtestMemo.valueAtBuy);
                backtestMemo.inUse = false;
                config.countTrans++;
            }
    
            if(backtestMemo.inUse == false && data.close <= config.lowest){
                console.log(data.date);
                console.log("Achat effectuée : " + data.close);
                backtestMemo.inUse = true;
                backtestMemo.valueAtBuy = data.close;
            }

            if(backtestMemo.inUse == true && utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) >= config.limiteSell){
                console.log(data.date);
                console.log("Vente effectuée : " + data.close);
                console.log("Différence : " + (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) -1) + "%");
                config.result += (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) -1);
                backtestMemo.inUse = false;
                config.countTrans++;
            }

        }else{
            config.memory.push({date : data.date, value : data.close});
        }
        
    },

    // Retourne le total des pertes/benefices en %
    getGlobalResult : function(){
        return config.result;
    },

    getNumberTransac : function(){
        return config.countTrans;
    },

    // Fonction appellée pour utiliser la stratégie
    check : function(currency, data){
        // TODO
    },

    acheter : function(){
        //TODO
    },

    vendre : function(){
        //TODO
    }

}