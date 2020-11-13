outEl.innerHTML += "<h1>Purchasing Agents</h1>";

/*
    Using map(), you extract the purchasing agent object
    from each business and store it in a new array
*/

// const agents = businesses.map(business => {
//     return business.purchasingAgent
// })

// console.table(agents)

// agents.forEach(agent => {
//   outEl.innerHTML += `<h2>${agent.nameFirst} ${agent.nameLast}</h2>`;
//   outEl.innerHTML += "<hr/>";
// });

// Lightning Exercise: Instead of just returning the purchasing agent object, return a new object that has the full name of the purchasing agent, the company name, and the phone number.
//  The data structure is shown below. Use that new data structure to display the agent with their company and phone number

const newAgent = businesses.map(business => {
    let newObject = {
        fullname: `${business.purchasingAgent.nameFirst} ${business.purchasingAgent.nameLast}`,
        company: business.companyName,
        phoneNumber: business.phoneWork
    };
    return newObject;
});

console.table(newAgent);


newAgent.forEach(agent => {
    outEl.innerHTML += `<h2>${agent.fullname}</h2>
        <section>${agent.company}</section>
        <section>${agent.phoneNumber}</section>
        <hr/>`;
  });