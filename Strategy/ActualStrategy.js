var ema = require("../Indicator/Ema");
var rsi = require("../Indicator/Rsi");
var utils = require("../Core/Utils");

const config = {
    topBTC : 0,
    highest : 0,
    lowest : 0,
    periode : 24,
    memory : [],
    result : 0,
    limiteSell : 5,
    fees : 1,
    countTrans : 0,
}

const backtestMemo = {
    inUse : false,
    expandActive : false,
    valueAtBuy : 0,
    limitBuy : 0,
    stoploss : 8,
    lastValidPrice : 0,
}

module.exports = {

    // Initialisation des variables de la strategie
    init : function(){
        // TODO
    },

    // Active la stratégie en mode backtest
    backtestCheck : async function(currency, data){

        if(config.topBTC < data.close){
            config.topBTC = data.close;
            backtestMemo.limitBuy = data.close * 0.8;
        }

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
            
            // Vente
            if(backtestMemo.inUse == true){
                if((data.close >= config.highest) && (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) >= config.limiteSell)){
                    if(backtestMemo.expandActive == false){
                        backtestMemo.expandActive = true
                    }else{
                        if(utils.getPercentDiff(backtestMemo.lastValidPrice, data.close) >= 5){
                            backtestMemo.lastValidPrice = data.close;
                        }else{
                            if(utils.getPercentDiff(backtestMemo.lastValidPrice, data.close) >= -5){
                                this.vendre(data);
                            }
                        }
                    }   
                }
                if(utils.getPercentDiff(backtestMemo.valueAtBuy, data.close) <= -5){
                    this.vendre(data);
                }
            }else{
                // Achat
                if(data.close <= config.lowest && data.close < backtestMemo.limitBuy){
                    this.acheter(data);
                }
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
    papermode : function(currency, data){
        
        if(config.topBTC < data.close){
            config.topBTC = data.close;
            backtestMemo.limitBuy = data.close * 0.8;
        }

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
            
            // Vente
            if(backtestMemo.inUse == true){
                if((data.close >= config.highest) && (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) >= config.limiteSell)){
                    if(backtestMemo.expandActive == false){
                        backtestMemo.expandActive = true
                    }else{
                        if(utils.getPercentDiff(backtestMemo.lastValidPrice, data.close) >= 5){
                            backtestMemo.lastValidPrice = data.close;
                        }else{
                            if(utils.getPercentDiff(backtestMemo.lastValidPrice, data.close) >= -5){
                                this.vendre(data);
                            }
                        }
                    }   
                }
                if(utils.getPercentDiff(backtestMemo.valueAtBuy, data.close) <= -5){
                    this.vendre(data);
                }
            }else{
                // Achat
                if(data.close <= config.lowest && data.close < backtestMemo.limitBuy){
                    this.acheter(data);
                }
            }

        }else{
            config.memory.push({date : data.date, value : data.close});
        }
    },

    // Fonction appellée pour utiliser la stratégie
    check : function(currency, data){
        
        if(config.topBTC < data.close){
            config.topBTC = data.close;
            backtestMemo.limitBuy = data.close * 0.8;
        }

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
            
            // Vente
            if(backtestMemo.inUse == true){
                if((data.close >= config.highest) && (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) >= config.limiteSell)){
                    if(backtestMemo.expandActive == false){
                        backtestMemo.expandActive = true
                    }else{
                        if(utils.getPercentDiff(backtestMemo.lastValidPrice, data.close) >= 5){
                            backtestMemo.lastValidPrice = data.close;
                        }else{
                            if(utils.getPercentDiff(backtestMemo.lastValidPrice, data.close) >= -5){
                                this.vendre(data);
                            }
                        }
                    }   
                }
                if(utils.getPercentDiff(backtestMemo.valueAtBuy, data.close) <= -5){
                    this.vendre(data);
                }
            }else{
                // Achat
                if(data.close <= config.lowest && data.close < backtestMemo.limitBuy){
                    this.acheter(data);
                }
            }

        }else{
            config.memory.push({date : data.date, value : data.close});
        }
    },

    acheter : function(data){
        console.log(data.date);
        console.log("Achat effectuée : " + data.close);
        backtestMemo.inUse = true;
        backtestMemo.valueAtBuy = data.close;
    },

    vendre : function(data){
        console.log(data.date);
        console.log("Vente effectuée : " + data.close);
        console.log("Différence : " + (utils.getPercentDiff(data.close, backtestMemo.valueAtBuy) -1) + "%");
        config.result += utils.getPercentDiff(data.close, backtestMemo.valueAtBuy);
        backtestMemo.inUse = false;
        config.countTrans++;
    }

}