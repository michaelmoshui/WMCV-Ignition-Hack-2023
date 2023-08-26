async function product_search(search_keywords, number_of_products = 3) {
    const amazonScraper = require('amazon-buddy');
    const results = [];
  
    try {
      for (const keyword of search_keywords) {
        // Collect products for each keyword in the array
        const products = await amazonScraper.products({ keyword: keyword, number: number_of_products });
  
        // Ensure products is an array and contains items
        const info = products['result'];
        if (Array.isArray(info) && info.length > 0) {
          const firstThreeProducts = info.slice(0, Math.min(info.length, 3));
          results.push(...firstThreeProducts);
        }
      }
      return results;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Example usage with an array of search keywords
  const searchKeywords = ['xbox one', 'playstation 5', 'nintendo switch'];
  product_search(searchKeywords, 3)
    .then(productInfoList => {
      console.log(productInfoList);
    })
    .catch(error => {
      console.error(error);
    });
  