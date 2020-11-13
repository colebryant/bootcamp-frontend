// This module builds the navigation bar and appends it to the DOM when called

const Nav = {
    buildNavbar () {
        const navContainer = document.createElement("nav");
        navContainer.classList.add("navBar");
        const navList = document.createElement("ul");
        navContainer.appendChild(navList);

        const companyItem = document.createElement("li");
        companyItem.innerHTML = '<a class = "navItem companyItem" href="#">Betsy</a>'
        const navLink1 = document.createElement("li");
        navLink1.innerHTML = '<a class = "navItem" href="#">Categories</a>'
        const navLink2 = document.createElement("li");
        navLink2.innerHTML = '<a class = "navItem" href="#">Orders</a>'
        const navLink3 = document.createElement("li");
        navLink3.innerHTML = '<a class = "navItem" href="#">Logout</a>'

        navList.appendChild(companyItem);
        navList.appendChild(navLink1);
        navList.appendChild(navLink2);
        navList.appendChild(navLink3);

        const output = document.querySelector(".output");
        output.appendChild(navContainer);
    }
};

export default Nav;