const students = [
    {
        name: "Chris Miller",
        class: "History",
        info: "Failed last exam",
        score: 59
    },
    {
        name: "Courtney Seward",
        class: "History",
        info: "Has completed all homework",
        score: 91
    },
    {
        name: "Garrett Ward",
        class: "History",
        info: "Wonderful at helping other students",
        score: 88
    },
    {
        name: "John Dulaney",
        class: "History",
        info: "Has never missed a class or exam",
        score: 92
    },
    {
        name: "Greg Lawrence",
        class: "History",
        info: "Sub-par performance all around",
        score: 64
    },
    {
        name: "Leah Duvic",
        class: "History",
        info: "Wonderful student",
        score: 97
    },
    {
        name: "Jesse Page",
        class: "History",
        info: "Smokes too much. Distracting.",
        score: 76
    },
    {
        name: "Kevin Haggerty",
        class: "History",
        info: "Falls asleep in class",
        score: 79
    },
    {
        name: "Max Wolf",
        class: "History",
        info: "Talks too much",
        score: 83
    },
    {
        name: "Lissa Goforth",
        class: "History",
        info: "Asks pointless, unrelated questions",
        score: 78
    },
    {
        name: "Tyler Bowman",
        class: "History",
        info: "When was the last time he attended class?",
        score: 48
    },
    {
        name: "Ray Medrano",
        class: "History",
        info: "Needs to contribute to in-class discussions",
        score: 95
    }
]

const h1 = (...props) => {
    const h1Element = document.createElement('h1');
    h1Element.textContent = props[0];
    h1Element.classList.add("xx-large", props[1]);
    return h1Element;
}
  
const section = (...props) => {
    const sectionElement = document.createElement("section");
    sectionElement.textContent = props[0];
    sectionElement.classList.add(props[1]);
    return sectionElement;
}
  
const aside = (...props) => {
    const asideElement = document.createElement("aside");
    asideElement.textContent = props[0];
    asideElement.classList.add("bordered", "dashed", props[1]);
    return asideElement;
}

const div = (...props) => {
    const divElement = document.createElement("div");
    divElement.classList.add(props[0]);
    return divElement;
}

// Below: attempting to create universal function

// const addElement = (...props) => {
//     const elementToAdd = document.createElement()
// }

for (let i = 0; i < students.length; i++) {
    let studentComponent = document.getElementById("container");
    let divElement = div("student");
    studentComponent.appendChild(divElement);
    if (students[i].score >= 60) {
        divElement.appendChild(h1(students[i].name, "passing"));
        divElement.appendChild(section(students[i].class, "section--padded"));
        divElement.appendChild(aside(students[i].info, "pushRight"));
    } else {
        divElement.appendChild(h1(students[i].name, "failing"));
        divElement.appendChild(section(students[i].class, "section--padded"));
        divElement.appendChild(aside(students[i].info, "pushRight"));
    }
}