
function product_search(search_keyword, number_of_products=5){
const amazonScraper = require('amazon-buddy');

(async () => {
    try {
        // Collect 50 products from a keyword 'xbox one'
        // Default country is US
        const products = await amazonScraper.products({ keyword: search_keyword, number: number_of_products });
    } catch (error) {
        console.log(error);
    }
})();
}

product_search('orange juice');