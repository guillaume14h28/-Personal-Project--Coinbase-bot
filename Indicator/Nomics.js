const puppeteer = require('puppeteer');

var nomics_indicator = {
    "estimation" : "",
    "pourcentage_variation" : "",
    "pourcentage_erreur" : ""
};

module.exports = {

    updateNomicsPrediction : async function(){

        try {
            const browser = await puppeteer.launch();
            const [page] = await browser.pages();
    
            await page.goto('https://nomics.com/assets/btc-bitcoin', { waitUntil: 'networkidle0' });
        
            const prediction = await page.evaluate(() => Array.from(document.querySelectorAll('.n-blur-text-underline'), element => element.textContent));
        
            await browser.close();

            nomics_indicator.estimation = prediction[0];
            nomics_indicator.pourcentage_variation = prediction[1];
            nomics_indicator.pourcentage_erreur = prediction[2];

            return nomics_indicator;

        } catch (err) {

            console.error(err);
            return false;

        }
        
    }

}