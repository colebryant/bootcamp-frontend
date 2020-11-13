/*
A small business wants to keep track of its employees and the computers that they use.
Each employee is assigned to a department, and they each get assigned a computer when they join the company.

1) Build arrays of objects that represent Employees, Departments, and Computers.
2) Assign every resource a unique id property.
3) Assign each employee to a department using a foreign key.
4) Assign each employee a computer using a foreign key.
*/
const businessData = {
    employees: [
        {
            employeeId: 1,
            name: "Dwight",
            departmentId: 1,
            computerId: 1,
        },
        {
            employeeId: 2,
            name: "Michael",
            departmentId: 4,
            computerId: 2,
        },
        {
            employeeId: 3,
            name: "Pam",
            departmentId: 2,
            computerId: 3
        },
        {
            employeeId: 4,
            name: "Jim",
            departmentId: 1,
            computerId: 4
        },
        {
            employeeId: 5,
            name: "Andy",
            departmentId: 4,
            computerId: 5
        },
        {
            employeeId: 6,
            name: "Angela",
            departmentId: 3,
            computerId: 6
        },
        {
            employeeId: 7,
            name: "Kevin",
            departmentId: 3,
            computerId: 7
        }
    ],
    departments: [
        {
            departmentId: 1,
            name: "Sales"
        },
        {
            departmentId: 2,
            name: "Secretarial"
        },
        {
            departmentId: 3,
            name: "Accounting"
        },
        {
            departmentId: 4,
            name: "Management"
        }
    ],
    computers: [
        {
            computerId: 1,
            type: "PC"
        },
        {
            computerId: 2,
            type: "PC"
        },
        {
            computerId: 3,
            type: "PC"
        },
        {
            computerId: 4,
            type: "PC"
        },
        {
            computerId: 5,
            type: "PC"
        },
        {
            computerId: 6,
            type: "PC"
        },
        {
            computerId: 7,
            type: "PC"
        }
    ]
};

export default businessData;