(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _module = _interopRequireDefault(require("./module1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  _module.default.employees.forEach(employee => {
    const cardContainer = $("<article>").addClass("employee");
    const cardHeader = $("<header>").addClass("employee__name").text(employee.name);
    cardHeader.appendTo(cardContainer);
    const cardDept = $("<section>").addClass("employee__department").text(`Works in the ${_module.default.departments[employee.departmentId - 1].name} department`);
    cardDept.appendTo(cardContainer);
    const cardComp = $("<section>").addClass("employee__computer").text(`Currently using a ${_module.default.computers[employee.computerId - 1].type}`);
    cardComp.appendTo(cardContainer);
    cardContainer.appendTo(output);
  });
};

buildDom();

},{"./module1":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
A small business wants to keep track of its employees and the computers that they use.
Each employee is assigned to a department, and they each get assigned a computer when they join the company.

1) Build arrays of objects that represent Employees, Departments, and Computers.
2) Assign every resource a unique id property.
3) Assign each employee to a department using a foreign key.
4) Assign each employee a computer using a foreign key.
*/
const businessData = {
  employees: [{
    employeeId: 1,
    name: "Dwight",
    departmentId: 1,
    computerId: 1
  }, {
    employeeId: 2,
    name: "Michael",
    departmentId: 4,
    computerId: 2
  }, {
    employeeId: 3,
    name: "Pam",
    departmentId: 2,
    computerId: 3
  }, {
    employeeId: 4,
    name: "Jim",
    departmentId: 1,
    computerId: 4
  }, {
    employeeId: 5,
    name: "Andy",
    departmentId: 4,
    computerId: 5
  }, {
    employeeId: 6,
    name: "Angela",
    departmentId: 3,
    computerId: 6
  }, {
    employeeId: 7,
    name: "Kevin",
    departmentId: 3,
    computerId: 7
  }],
  departments: [{
    departmentId: 1,
    name: "Sales"
  }, {
    departmentId: 2,
    name: "Secretarial"
  }, {
    departmentId: 3,
    name: "Accounting"
  }, {
    departmentId: 4,
    name: "Management"
  }],
  computers: [{
    computerId: 1,
    type: "PC"
  }, {
    computerId: 2,
    type: "PC"
  }, {
    computerId: 3,
    type: "PC"
  }, {
    computerId: 4,
    type: "PC"
  }, {
    computerId: 5,
    type: "PC"
  }, {
    computerId: 6,
    type: "PC"
  }, {
    computerId: 7,
    type: "PC"
  }]
};
var _default = businessData;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vZHVsZTEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsTUFBTSxRQUFRLEdBQUcsTUFBTTtBQUNuQixRQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBRCxDQUFoQjs7QUFDQSxrQkFBYSxTQUFiLENBQXVCLE9BQXZCLENBQStCLFFBQVEsSUFBSTtBQUN2QyxVQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUsUUFBZixDQUF3QixVQUF4QixDQUF0QjtBQUNBLFVBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxJQUF6QyxDQUE4QyxRQUFRLENBQUMsSUFBdkQsQ0FBbkI7QUFDQSxJQUFBLFVBQVUsQ0FBQyxRQUFYLENBQW9CLGFBQXBCO0FBQ0EsVUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLFFBQWYsQ0FBd0Isc0JBQXhCLEVBQWdELElBQWhELENBQXNELGdCQUFlLGdCQUFhLFdBQWIsQ0FBeUIsUUFBUSxDQUFDLFlBQVQsR0FBc0IsQ0FBL0MsRUFBa0QsSUFBSyxhQUE1SCxDQUFqQjtBQUNBLElBQUEsUUFBUSxDQUFDLFFBQVQsQ0FBa0IsYUFBbEI7QUFDQSxVQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUsUUFBZixDQUF3QixvQkFBeEIsRUFBOEMsSUFBOUMsQ0FBb0QscUJBQW9CLGdCQUFhLFNBQWIsQ0FBdUIsUUFBUSxDQUFDLFVBQVQsR0FBb0IsQ0FBM0MsRUFBOEMsSUFBSyxFQUEzSCxDQUFqQjtBQUNBLElBQUEsUUFBUSxDQUFDLFFBQVQsQ0FBa0IsYUFBbEI7QUFFQSxJQUFBLGFBQWEsQ0FBQyxRQUFkLENBQXVCLE1BQXZCO0FBQ0gsR0FWRDtBQVdILENBYkQ7O0FBZUEsUUFBUTs7Ozs7Ozs7OztBQ2xDUjs7Ozs7Ozs7O0FBU0EsTUFBTSxZQUFZLEdBQUc7QUFDakIsRUFBQSxTQUFTLEVBQUUsQ0FDUDtBQUNJLElBQUEsVUFBVSxFQUFFLENBRGhCO0FBRUksSUFBQSxJQUFJLEVBQUUsUUFGVjtBQUdJLElBQUEsWUFBWSxFQUFFLENBSGxCO0FBSUksSUFBQSxVQUFVLEVBQUU7QUFKaEIsR0FETyxFQU9QO0FBQ0ksSUFBQSxVQUFVLEVBQUUsQ0FEaEI7QUFFSSxJQUFBLElBQUksRUFBRSxTQUZWO0FBR0ksSUFBQSxZQUFZLEVBQUUsQ0FIbEI7QUFJSSxJQUFBLFVBQVUsRUFBRTtBQUpoQixHQVBPLEVBYVA7QUFDSSxJQUFBLFVBQVUsRUFBRSxDQURoQjtBQUVJLElBQUEsSUFBSSxFQUFFLEtBRlY7QUFHSSxJQUFBLFlBQVksRUFBRSxDQUhsQjtBQUlJLElBQUEsVUFBVSxFQUFFO0FBSmhCLEdBYk8sRUFtQlA7QUFDSSxJQUFBLFVBQVUsRUFBRSxDQURoQjtBQUVJLElBQUEsSUFBSSxFQUFFLEtBRlY7QUFHSSxJQUFBLFlBQVksRUFBRSxDQUhsQjtBQUlJLElBQUEsVUFBVSxFQUFFO0FBSmhCLEdBbkJPLEVBeUJQO0FBQ0ksSUFBQSxVQUFVLEVBQUUsQ0FEaEI7QUFFSSxJQUFBLElBQUksRUFBRSxNQUZWO0FBR0ksSUFBQSxZQUFZLEVBQUUsQ0FIbEI7QUFJSSxJQUFBLFVBQVUsRUFBRTtBQUpoQixHQXpCTyxFQStCUDtBQUNJLElBQUEsVUFBVSxFQUFFLENBRGhCO0FBRUksSUFBQSxJQUFJLEVBQUUsUUFGVjtBQUdJLElBQUEsWUFBWSxFQUFFLENBSGxCO0FBSUksSUFBQSxVQUFVLEVBQUU7QUFKaEIsR0EvQk8sRUFxQ1A7QUFDSSxJQUFBLFVBQVUsRUFBRSxDQURoQjtBQUVJLElBQUEsSUFBSSxFQUFFLE9BRlY7QUFHSSxJQUFBLFlBQVksRUFBRSxDQUhsQjtBQUlJLElBQUEsVUFBVSxFQUFFO0FBSmhCLEdBckNPLENBRE07QUE2Q2pCLEVBQUEsV0FBVyxFQUFFLENBQ1Q7QUFDSSxJQUFBLFlBQVksRUFBRSxDQURsQjtBQUVJLElBQUEsSUFBSSxFQUFFO0FBRlYsR0FEUyxFQUtUO0FBQ0ksSUFBQSxZQUFZLEVBQUUsQ0FEbEI7QUFFSSxJQUFBLElBQUksRUFBRTtBQUZWLEdBTFMsRUFTVDtBQUNJLElBQUEsWUFBWSxFQUFFLENBRGxCO0FBRUksSUFBQSxJQUFJLEVBQUU7QUFGVixHQVRTLEVBYVQ7QUFDSSxJQUFBLFlBQVksRUFBRSxDQURsQjtBQUVJLElBQUEsSUFBSSxFQUFFO0FBRlYsR0FiUyxDQTdDSTtBQStEakIsRUFBQSxTQUFTLEVBQUUsQ0FDUDtBQUNJLElBQUEsVUFBVSxFQUFFLENBRGhCO0FBRUksSUFBQSxJQUFJLEVBQUU7QUFGVixHQURPLEVBS1A7QUFDSSxJQUFBLFVBQVUsRUFBRSxDQURoQjtBQUVJLElBQUEsSUFBSSxFQUFFO0FBRlYsR0FMTyxFQVNQO0FBQ0ksSUFBQSxVQUFVLEVBQUUsQ0FEaEI7QUFFSSxJQUFBLElBQUksRUFBRTtBQUZWLEdBVE8sRUFhUDtBQUNJLElBQUEsVUFBVSxFQUFFLENBRGhCO0FBRUksSUFBQSxJQUFJLEVBQUU7QUFGVixHQWJPLEVBaUJQO0FBQ0ksSUFBQSxVQUFVLEVBQUUsQ0FEaEI7QUFFSSxJQUFBLElBQUksRUFBRTtBQUZWLEdBakJPLEVBcUJQO0FBQ0ksSUFBQSxVQUFVLEVBQUUsQ0FEaEI7QUFFSSxJQUFBLElBQUksRUFBRTtBQUZWLEdBckJPLEVBeUJQO0FBQ0ksSUFBQSxVQUFVLEVBQUUsQ0FEaEI7QUFFSSxJQUFBLElBQUksRUFBRTtBQUZWLEdBekJPO0FBL0RNLENBQXJCO2VBK0ZlLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgYnVzaW5lc3NEYXRhIGZyb20gXCIuL21vZHVsZTFcIjtcclxuXHJcbi8qXHJcbk9uY2UgeW91ciBkYXRhIGlzIG5vcm1hbGl6ZWQsIHVzZSB5b3VyIERPTSBza2lsbHMgdG8gZGlzcGxheSBhIGNhcmQgZm9yIGVhY2ggZW1wbG95ZWUuXHJcbkl0IHNob3VsZCBkaXNwbGF5IHRoZSBlbXBsb3llZSBuYW1lLCB0aGUgbmFtZSBvZiB0aGVpciBkZXBhcnRtZW50LCBhbmQgd2hpY2ggY29tcHV0ZXIgdGhleSBhcmUgdXNpbmcuXHJcblxyXG48YXJ0aWNsZSBjbGFzcz1cImVtcGxveWVlXCI+XHJcbiAgICA8aGVhZGVyIGNsYXNzPVwiZW1wbG95ZWVfX25hbWVcIj5cclxuICAgICAgICA8aDE+UmFpbnUgSXR0eWNoZXJpYWg8L2gxPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cImVtcGxveWVlX19kZXBhcnRtZW50XCI+XHJcbiAgICAgICAgV29ya3MgaW4gdGhlIElUIGRlcGFydG1lbnRcclxuICAgIDwvc2VjdGlvbj5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwiZW1wbG95ZWVfX2NvbXB1dGVyXCI+XHJcbiAgICAgICAgQ3VycmVudGx5IHVzaW5nIGEgMjAxNSBNYWNCb29rIFByb1xyXG4gICAgPC9zZWN0aW9uPlxyXG48L2FydGljbGU+XHJcbiovXHJcblxyXG5jb25zdCBidWlsZERvbSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG91dHB1dCA9ICQoXCIub3V0cHV0XCIpO1xyXG4gICAgYnVzaW5lc3NEYXRhLmVtcGxveWVlcy5mb3JFYWNoKGVtcGxveWVlID0+IHtcclxuICAgICAgICBjb25zdCBjYXJkQ29udGFpbmVyID0gJChcIjxhcnRpY2xlPlwiKS5hZGRDbGFzcyhcImVtcGxveWVlXCIpO1xyXG4gICAgICAgIGNvbnN0IGNhcmRIZWFkZXIgPSAkKFwiPGhlYWRlcj5cIikuYWRkQ2xhc3MoXCJlbXBsb3llZV9fbmFtZVwiKS50ZXh0KGVtcGxveWVlLm5hbWUpO1xyXG4gICAgICAgIGNhcmRIZWFkZXIuYXBwZW5kVG8oY2FyZENvbnRhaW5lcik7XHJcbiAgICAgICAgY29uc3QgY2FyZERlcHQgPSAkKFwiPHNlY3Rpb24+XCIpLmFkZENsYXNzKFwiZW1wbG95ZWVfX2RlcGFydG1lbnRcIikudGV4dChgV29ya3MgaW4gdGhlICR7YnVzaW5lc3NEYXRhLmRlcGFydG1lbnRzW2VtcGxveWVlLmRlcGFydG1lbnRJZC0xXS5uYW1lfSBkZXBhcnRtZW50YCk7XHJcbiAgICAgICAgY2FyZERlcHQuYXBwZW5kVG8oY2FyZENvbnRhaW5lcik7XHJcbiAgICAgICAgY29uc3QgY2FyZENvbXAgPSAkKFwiPHNlY3Rpb24+XCIpLmFkZENsYXNzKFwiZW1wbG95ZWVfX2NvbXB1dGVyXCIpLnRleHQoYEN1cnJlbnRseSB1c2luZyBhICR7YnVzaW5lc3NEYXRhLmNvbXB1dGVyc1tlbXBsb3llZS5jb21wdXRlcklkLTFdLnR5cGV9YCk7XHJcbiAgICAgICAgY2FyZENvbXAuYXBwZW5kVG8oY2FyZENvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGNhcmRDb250YWluZXIuYXBwZW5kVG8ob3V0cHV0KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuYnVpbGREb20oKTtcclxuXHJcblxyXG4iLCIvKlxyXG5BIHNtYWxsIGJ1c2luZXNzIHdhbnRzIHRvIGtlZXAgdHJhY2sgb2YgaXRzIGVtcGxveWVlcyBhbmQgdGhlIGNvbXB1dGVycyB0aGF0IHRoZXkgdXNlLlxyXG5FYWNoIGVtcGxveWVlIGlzIGFzc2lnbmVkIHRvIGEgZGVwYXJ0bWVudCwgYW5kIHRoZXkgZWFjaCBnZXQgYXNzaWduZWQgYSBjb21wdXRlciB3aGVuIHRoZXkgam9pbiB0aGUgY29tcGFueS5cclxuXHJcbjEpIEJ1aWxkIGFycmF5cyBvZiBvYmplY3RzIHRoYXQgcmVwcmVzZW50IEVtcGxveWVlcywgRGVwYXJ0bWVudHMsIGFuZCBDb21wdXRlcnMuXHJcbjIpIEFzc2lnbiBldmVyeSByZXNvdXJjZSBhIHVuaXF1ZSBpZCBwcm9wZXJ0eS5cclxuMykgQXNzaWduIGVhY2ggZW1wbG95ZWUgdG8gYSBkZXBhcnRtZW50IHVzaW5nIGEgZm9yZWlnbiBrZXkuXHJcbjQpIEFzc2lnbiBlYWNoIGVtcGxveWVlIGEgY29tcHV0ZXIgdXNpbmcgYSBmb3JlaWduIGtleS5cclxuKi9cclxuY29uc3QgYnVzaW5lc3NEYXRhID0ge1xyXG4gICAgZW1wbG95ZWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbXBsb3llZUlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkR3aWdodFwiLFxyXG4gICAgICAgICAgICBkZXBhcnRtZW50SWQ6IDEsXHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVtcGxveWVlSWQ6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiTWljaGFlbFwiLFxyXG4gICAgICAgICAgICBkZXBhcnRtZW50SWQ6IDQsXHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVtcGxveWVlSWQ6IDMsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiUGFtXCIsXHJcbiAgICAgICAgICAgIGRlcGFydG1lbnRJZDogMixcclxuICAgICAgICAgICAgY29tcHV0ZXJJZDogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbXBsb3llZUlkOiA0LFxyXG4gICAgICAgICAgICBuYW1lOiBcIkppbVwiLFxyXG4gICAgICAgICAgICBkZXBhcnRtZW50SWQ6IDEsXHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW1wbG95ZWVJZDogNSxcclxuICAgICAgICAgICAgbmFtZTogXCJBbmR5XCIsXHJcbiAgICAgICAgICAgIGRlcGFydG1lbnRJZDogNCxcclxuICAgICAgICAgICAgY29tcHV0ZXJJZDogNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbXBsb3llZUlkOiA2LFxyXG4gICAgICAgICAgICBuYW1lOiBcIkFuZ2VsYVwiLFxyXG4gICAgICAgICAgICBkZXBhcnRtZW50SWQ6IDMsXHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW1wbG95ZWVJZDogNyxcclxuICAgICAgICAgICAgbmFtZTogXCJLZXZpblwiLFxyXG4gICAgICAgICAgICBkZXBhcnRtZW50SWQ6IDMsXHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDdcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgZGVwYXJ0bWVudHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlcGFydG1lbnRJZDogMSxcclxuICAgICAgICAgICAgbmFtZTogXCJTYWxlc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlcGFydG1lbnRJZDogMixcclxuICAgICAgICAgICAgbmFtZTogXCJTZWNyZXRhcmlhbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlcGFydG1lbnRJZDogMyxcclxuICAgICAgICAgICAgbmFtZTogXCJBY2NvdW50aW5nXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVwYXJ0bWVudElkOiA0LFxyXG4gICAgICAgICAgICBuYW1lOiBcIk1hbmFnZW1lbnRcIlxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjb21wdXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDEsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUENcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb21wdXRlcklkOiAyLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBDXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29tcHV0ZXJJZDogMyxcclxuICAgICAgICAgICAgdHlwZTogXCJQQ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDQsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUENcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb21wdXRlcklkOiA1LFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBDXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29tcHV0ZXJJZDogNixcclxuICAgICAgICAgICAgdHlwZTogXCJQQ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVySWQ6IDcsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUENcIlxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1c2luZXNzRGF0YTsiXX0=
