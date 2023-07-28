const getPrices = (players) => {
    let prices = []
    let maxPrice = players.length > 0 ? 
    Math.max(...players.map(x => (x.nowCost).toFixed(1))) : 0
    let minPrice = players.length > 0 ?  
    Math.min(...players.map(x => (x.nowCost).toFixed(1))) : 0
    
    for(let i=maxPrice; i>=minPrice; i-=0.5) {
        prices.push(+(i.toFixed(1)))
	
    }

    return prices
}

export default getPrices