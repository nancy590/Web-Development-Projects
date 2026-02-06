const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const deptInput = document.getElementById("dept");
const emailInput = document.getElementById("email");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

displayStudents();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
        name: nameInput.value,
        roll: rollInput.value,
        dept: deptInput.value,
        email: emailInput.value
    };

    if (editIndex === null) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = null;
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    displayStudents();
});

function displayStudents() {
    table.innerHTML = "";

    students.forEach((s, index) => {
        table.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.roll}</td>
                <td>${s.dept}</td>
                <td>${s.email}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(index) {
    const s = students[index];
    nameInput.value = s.name;
    rollInput.value = s.roll;
    deptInput.value = s.dept;
    emailInput.value = s.email;

    editIndex = index;
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
