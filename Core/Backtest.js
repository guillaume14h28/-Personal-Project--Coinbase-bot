var db = require("../Model/Database");

const config = {
    duration : "",
    durationType : "",
    strategy : "",
    currency : "",
}

module.exports = {

    // Initialisation de la configuration du Backtest
    initBacktest : function(duree, typeDuree, strategy, cryptomonnaie){
        config.duration = duree;
        config.durationType = typeDuree;
        config.strategy = strategy;
        config.currency = cryptomonnaie;

        this.launchBacktest();
    },

    // Lancement de l'opération de backtest
    launchBacktest : async function(){
        var strategy = require("../Strategy/" + config.strategy);
        strategy.init();
        db.getLastValuesByDuration(config.duration, config.durationType, config.currency).then((datas) => {
            for(var data of datas){
                strategy.backtestCheck(config.currency, data);
            }

            console.log("Resultat final : " + strategy.getGlobalResult() + "%");
            console.log("Nombre de transactions effectuées : " + strategy.getNumberTransac());
        });
        
    },

    // Retourne profit + list trade avec +/- en %
    getResultBacktest : function(){
        
    },

}