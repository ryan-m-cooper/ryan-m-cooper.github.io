// Create Portfolio
const interactivePortfolioContainer = document.getElementById("interactive-portfolio-container")
const cartographyPortfolioContainer = document.getElementById("cartography-portfolio-container")
const dataPortfolioContainer = document.getElementById("data-portfolio-container")
const experimentsPortfolioContainer = document.getElementById("experiments-portfolio-container")

fetch("./lib/portfolio.json")
    .then(response => response.json())
    .then(responseJSON => {
        // Process Interactive Items
        const interactiveItems = responseJSON["interactive"]
        setPortfolioSection(interactiveItems, interactivePortfolioContainer)

        // Process cartography
        const cartographyItems = responseJSON["cartography"]
        setPortfolioSection(cartographyItems, cartographyPortfolioContainer)

        // Process data analysis and viz 
        const dataItems = responseJSON["data"]
        setPortfolioSection(dataItems, dataPortfolioContainer)

        // Process experiments 
        const experimentsItems = responseJSON["experiments"]
        setPortfolioSection(experimentsItems, experimentsPortfolioContainer)
    })

function setPortfolioSection(items, el) {
    // Create HTML list items for tech stack
    const itemsListHTML = items.map(createTechStackList).join("")
    items.stackHTML = itemsListHTML

    // Generate HTML for each portfolio item
    itemsPortfolioHTML = items.map(createPortfolioItem)

    // Insert the portfolio items into the specified element
    itemsPortfolioHTML.forEach(item => el.insertAdjacentHTML("beforeend", item))

}


function createTechStackList(item) {
    let stackListHTML = ""
    if (item.stack) {
        item.stack.forEach(stackItem => {
            stackListHTML+=`<li><a href=${stackItem.url} class="btn btn-outline-primary shadow-none portfolio-link-btn" target="_blank">${stackItem.name}</a></li>`
        })
        item.stackHTML = stackListHTML
        return stackListHTML
    }
    return "No stack specified"
}

function createPortfolioItem(item) {
    return `
        <div class="card col-sm-12 col-md-6">
        <a href=${item.url} target="_blank"><img src=${item.thumbnail} class="card-img-top" alt="..."></a>
        <div class="card-body">
        <h4 class="card-title">${item.title}</h4>
        <p class="card-text">${item.description}</p>
        <h5 class="stack-list-header">Stack:</h5>
        <ul>${item.stackHTML}</ul>
        
        <a href=${item.url} class="btn btn-outline-primary shadow-none portfolio-link-btn" target="_blank">visit live version <i class="bi bi-box-arrow-up-right"></i></a>
    
        </div>
        </div>
        `
    }
