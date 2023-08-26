
function product_search(){
const amazonScraper = require('amazon-buddy');

(async () => {
    try {
        // Collect 50 products from a keyword 'xbox one'
        // Default country is US
        const products = await amazonScraper.products({ keyword: 'Red waterproof adidas shoes under 100 dollars', number: 5 });
        console.log(products);
    } catch (error) {
        console.log(error);
    }
})();
}

product_search();