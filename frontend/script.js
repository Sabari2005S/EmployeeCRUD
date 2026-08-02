// ======================
// API URL
// ======================
const API = "https://employeecrud-um7b.onrender.com";

let employees = [];

// ======================
// Load Employees
// ======================
window.onload = () => {
    loadEmployees();
};

async function loadEmployees() {
    try {
        const response = await fetch(`${API}/employees`);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        employees = await response.json();
        displayEmployees(employees);

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the backend.");
    }
}

// ======================
// Display Employees
// ======================
function displayEmployees(data) {

    let rows = "";

    data.forEach(emp => {

        rows += `
        <tr>
            <td>${emp[0]}</td>
            <td>${emp[1]}</td>
            <td>${emp[2]}</td>
            <td>${emp[3]}</td>
            <td>
                <button class="edit"
                    onclick="editEmployee(${emp[0]}, '${emp[1]}', '${emp[2]}', '${emp[3]}')">
                    Edit
                </button>

                <button class="delete"
                    onclick="deleteEmployee(${emp[0]})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    document.getElementById("employeeTable").innerHTML = rows;
}

// ======================
// Save Employee
// ======================
async function saveEmployee() {

    const id = document.getElementById("employeeId").value;

    const employee = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim()
    };

    if (!employee.name || !employee.email || !employee.department) {
        showMessage("Please fill all fields", "red");
        return;
    }

    try {

        if (id === "") {

            const response = await fetch(`${API}/employees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) throw new Error();

            showMessage("Employee Added Successfully", "green");

        } else {

            const response = await fetch(`${API}/employees/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) throw new Error();

            showMessage("Employee Updated Successfully", "blue");

            document.getElementById("saveBtn").innerHTML = "+ Add Employee";
        }

        clearForm();
        loadEmployees();

    } catch (error) {

        console.error(error);
        showMessage("Operation Failed", "red");

    }

}

// ======================
// Edit Employee
// ======================
function editEmployee(id, name, email, department) {

    document.getElementById("employeeId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("department").value = department;

    document.getElementById("saveBtn").innerHTML = "Update Employee";
}

// ======================
// Delete Employee
// ======================
async function deleteEmployee(id) {

    if (!confirm("Delete Employee?")) return;

    try {

        const response = await fetch(`${API}/employees/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error();

        showMessage("Employee Deleted Successfully", "red");

        loadEmployees();

    } catch (error) {

        console.error(error);
        showMessage("Delete Failed", "red");

    }

}

// ======================
// Search Employee
// ======================
function searchEmployee() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = employees.filter(emp =>
        emp[1].toLowerCase().includes(value) ||
        emp[2].toLowerCase().includes(value) ||
        emp[3].toLowerCase().includes(value)
    );

    displayEmployees(filtered);

}

// ======================
// Clear Form
// ======================
function clearForm() {

    document.getElementById("employeeId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";

}

// ======================
// Message
// ======================
function showMessage(message, color) {

    const msg = document.getElementById("message");

    msg.innerHTML = message;
    msg.style.color = color;

    setTimeout(() => {
        msg.innerHTML = "";
    }, 3000);

}
