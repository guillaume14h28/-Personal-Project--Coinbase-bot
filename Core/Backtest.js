var db = require("../Model/Database");

module.exports = {

    config = {
        duration : "",
        durationType : "",
        strategy : "",
        currency : ""
    },

    // Initialisation de la configuration du Backtest
    initBacktest : function(duree, typeDuree, strategy, cryptomonnaie){
        this.config.duration = duree;
        this.config.durationType = typeDuree;
        this.config.strategy = strategy;
        this.config.currency = cryptomonnaie;
    },

    // Lancement de l'opération de backtest
    launchBacktest : function(){
        var strategy = require("../Strategy/" + this.config.strategy);
        var dataBacktest = db.getLastValuesByDuration(this.config.duration, this.config.durationType, this.config.currency);

        db.emptyBacktest();

        dataBacktest.forEach(data => {
            var result = strategy.analyse(this.config.currency, data);
            db.saveBacktest(data, result);
        });

        this.getResultBacktest();
        
    },

    // Retourne profit + list trade avec +/- en %
    getResultBacktest : function(){

    }

}