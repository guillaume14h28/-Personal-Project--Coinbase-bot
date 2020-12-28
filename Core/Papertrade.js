var db = require("../Model/Database");
var strat = require("../Strategy/ActualStrategy");

module.exports = {

    checkStrategy : function(currency) {
        
        // Get last data
        db.loadCurrentCurrency(currency);

        var value = db.getLastValue(currency);

        strat.init();
        strat.papermode();
        strat.check(currency, value);

    }

}