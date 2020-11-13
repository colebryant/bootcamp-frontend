import businessData from "./module1";

/*
Once your data is normalized, use your DOM skills to display a card for each employee.
It should display the employee name, the name of their department, and which computer they are using.

<article class="employee">
    <header class="employee__name">
        <h1>Rainu Ittycheriah</h1>
    </header>
    <section class="employee__department">
        Works in the IT department
    </section>
    <section class="employee__computer">
        Currently using a 2015 MacBook Pro
    </section>
</article>
*/

const buildDom = () => {
    const output = $(".output");
    businessData.employees.forEach(employee => {
        const cardContainer = $("<article>").addClass("employee");
        const cardHeader = $("<header>").addClass("employee__name").text(employee.name);
        cardHeader.appendTo(cardContainer);
        const cardDept = $("<section>").addClass("employee__department").text(`Works in the ${businessData.departments[employee.departmentId-1].name} department`);
        cardDept.appendTo(cardContainer);
        const cardComp = $("<section>").addClass("employee__computer").text(`Currently using a ${businessData.computers[employee.computerId-1].type}`);
        cardComp.appendTo(cardContainer);

        cardContainer.appendTo(output);
    });
};

buildDom();


