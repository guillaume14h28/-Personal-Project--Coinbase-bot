var Datastore = require('nedb');
var moment = require("moment");
const coinbase = require("../Core/Coinbase");
var btc = new Datastore({ filename: './Model/Database/history_currency.db', autoload: true });
var transac = new Datastore({ filename: './Model/Database/transaction.db', autoload: true });
var backtest = new Datastore({ filename: './Model/Database/backtest.db', autoload: true });

module.exports = {

    // Remplissage de la BDD avec anciennes données
    fillDatabaseCurrency : async function(currency) {

        var today = moment().startOf('hour');
        var yearAgo = moment().startOf('hour').subtract(1, "y");
        var indicator = moment().startOf('hour');
        var granularity = 3600; //Espacement périodes en secondes

        console.log("Remplissage de la BDD ...");
        console.log("Veuillez patienter ...");

        while (yearAgo.isBefore(indicator)) {

            indicator.subtract(granularity*200, "seconds");

            var history = await coinbase.getHistoryByCurrency(currency, indicator.toISOString(), today.toISOString(), granularity);

            history.forEach(row => {
                
                var doc =   {   
                                "date" : new Date(moment.unix(row[0]).format()),
                                "low" : row[1],
                                "high" : row[2],
                                "open" : row[3],
                                "close" : row[4],
                                "volume" : row[5],
                                "currency" : currency
                            };

                btc.insert(doc, function(err, newDoc){
                    if(err){
                        console.log(err);
                    }
                });
            })

            // Délai entre 2 appels vers l'API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mise à niveau de la valeur today utilisé pour start
            today.subtract(granularity*200, "seconds");

        }

        console.log("Fin de l'opération de remplissage !")
 
    },

    // Vide la table correspondante
    emptyDbBitcoin : function() {
        btc.remove({}, {multi: true}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("La DB a bien été vidée pour la table Bitcoin !")
            }
        })
    },

    emptyDbBacktest : function() {
        backtest.remove({}, {multi: true}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("La DB a bien été vidée pour la table Backtest !")
            }
        })
    },

    emptyDbTransac : function() {
        transac.remove({}, {multi: true}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("La DB a bien été vidée pour la table Transaction !")
            }
        })
    },

    loadCurrentCurrency : async function(currency) {
        var history = await coinbase.getCurrentStatByCurrency(currency);
        var current = history[0];
        var last = history[1];
   
        var doc =   {   
                        "date" : new Date(moment.unix(current[0]).format()),
                        "low" : current[1],
                        "high" : current[2],
                        "open" : current[3],
                        "close" : current[4],
                        "volume" : current[5],
                        "currency" : currency
                    };

       
        btc.insert(doc, function(err, newDoc){
            if(err){
                console.log(err);
                return false;
            }else{
                return newDoc;
            }
        });
    },

    getLastValue : async function(currency){
        return new Promise(resolve => {
            btc.findOne({ "currency" : currency }).sort({date : -1}).exec(function(err, docs){
                if(err){
                    console.log(err);
                }else{
                    resolve(docs);
                }
            });
        });
    },

    getLastValuesByDuration : async function(duree, typeDuree, currency){
        return new Promise(resolve => {
            btc.find().sort({date : 1}).exec(function(err, docs){
                if(err){
                    console.log(err);
                }else{
                    resolve(docs);
                }
            });
        });
    },

    registerTransactionBuy : function(currency, amount){

        var doc =   {   
            "type" : "buy",
            "date" : new Date(),
            "currency" : currency, // Identifiant de la Crypto
            "amount" : amount
        };

        transac.insert(doc, function(err, newDoc){
            if(err){
                console.log(err);
                return false;
            }else{
                return newDoc;
            }
        });
    },

    registerTransactionSell : function(currency, amount){

        var doc =   {   
            "type" : "sell",
            "date" : new Date(),
            "currency" : currency, // Identifiant de la Crypto
            "amount" : amount
        };

        transac.insert(doc, function(err, newDoc){
            if(err){
                console.log(err);
                return false;
            }else{
                return newDoc;
            }
        });
        
    },

    getLastTransaction : async function(currency){
        return new Promise(resolve => {
            transac.findOne({ "currency" : currency }).sort({date : -1}).exec(function(err, docs){
                if(err){
                    console.log(err);
                }else{
                    resolve(docs);
                }
            });
        });
    },
}