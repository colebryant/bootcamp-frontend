const output = document.querySelector("#output");
const header = document.createElement("h1");
header.textContent = "Weekly Sales Report";
output.appendChild(header);

const searchContainer = document.createElement("fieldset");
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("name", "searchInput");
searchContainer.append(searchInput);
output.appendChild(searchContainer);

searchInput.addEventListener("keypress", e => {
    if (e.charCode === 13) {
        const searchTerm = e.target.value;
        const sale = salesByWeek.find(element => {
            return element.sales_agent.first_name.includes(searchTerm) ||
            element.sales_agent.last_name.includes(searchInput)
        });
        let salesContainer = document.createElement("article");
        let agentName = document.createElement("h2");
        agentName.textContent = `${sale.sales_agent.first_name} ${sale.sales_agent.last_name}`
        salesContainer.appendChild(agentName);

        for(const entry of Object.entries(sale.vehicle)) {
            let vehicleInfo = document.createElement("p");
            vehicleInfo.textContent = `${entry[0]}: ${entry[1]}`;
            salesContainer.appendChild(vehicleInfo);
        };
        let profitItem = document.createElement("h3");
        profitItem.textContent = `Profit: $${sale.gross_profit}`;
        let horizontal = document.createElement("hr");

        salesContainer.appendChild(profitItem);
        salesContainer.appendChild(horizontal);

        output.appendChild(salesContainer);
    }
})
