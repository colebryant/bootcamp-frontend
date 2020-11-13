// Lightning Exercise: Add another section sibling to the current one and use object dot notation to display each company's city.
// Use square bracket notation to display the state code. Use dynamic square bracket notation to add the zip code.

const zipVar = "addressZipCode";

const outEl = document.querySelector("#output")
outEl.innerHTML = "<h1>Active Businesses</h1>"

businesses.forEach(business => {
  outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
      ${business.addressCity}, ${business["addressStateCode"]} ${business[zipVar]}
    </section>
  `
  outEl.innerHTML += "<hr/>"
});

let nyBiz = [];
const newYorkBusinesses = businesses.filter(business => {
    if (business.addressStateCode === "NY") {
        nyBiz.push(business);
    }
});

console.log(nyBiz);

// Lightning Exercise: Use filter() to create another array named manufacturingBusinesses that will contain all businesses in the manufacturing industry.
// Display those to the DOM.

let manufacturingBusinesses = [];

const manuBiz = businesses.filter(business => {
    if (business.companyIndustry === "Manufacturing") {
        manufacturingBusinesses.push(business);
    }
});

outEl.innerHTML += "<h1>Manufacturing Businesses</h1>";

manufacturingBusinesses.forEach(business => {
    outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
      ${business.addressCity}, ${business["addressStateCode"]} ${business[zipVar]}
    </section>
    `;
    outEl.innerHTML += `<hr/>`;
});