fs = require("fs");

module.exports = {
    
    getConfig : function (){
        var config = fs.readFileSync("./config.json");
        var jsonConfig = JSON.parse(config);

       return jsonConfig;
    },

    getPercentDiff : function(oldNumber, newNumber){
        var decreaseValue = oldNumber - newNumber;
    
        return (decreaseValue / oldNumber) * 100;
    },

    getPercentChange : function(oldNumber, percent){
        var value = oldNumber;
        return oldNumber;
    },

    getValueDiff: function(oldNumber, newNumber){
        return newNumber - oldNumber;
    },

}