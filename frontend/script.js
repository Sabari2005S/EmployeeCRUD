const API = "http://127.0.0.1:8000";

let employees = [];

window.onload = () => {

loadEmployees();

}

async function loadEmployees(){

const response = await fetch(API+"/employees");

employees = await response.json();

displayEmployees(employees);

}

function displayEmployees(data){

let rows="";

data.forEach(emp=>{

rows+=`

<tr>

<td>${emp[0]}</td>

<td>${emp[1]}</td>

<td>${emp[2]}</td>

<td>${emp[3]}</td>

<td>

<button class="edit"
onclick="editEmployee(${emp[0]},'${emp[1]}','${emp[2]}','${emp[3]}')">

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

document.getElementById("employeeTable").innerHTML=rows;

}

async function saveEmployee(){

const id=document.getElementById("employeeId").value;

const employee={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

department:document.getElementById("department").value

};

if(employee.name==""||employee.email==""||employee.department==""){

showMessage("Fill all fields","red");

return;

}

if(id==""){

await fetch(API+"/employees",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(employee)

});

showMessage("Employee Added Successfully","green");

}else{

await fetch(API+"/employees/"+id,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(employee)

});

showMessage("Employee Updated Successfully","blue");

document.getElementById("saveBtn").innerHTML="Add Employee";

}

clearForm();

loadEmployees();

}

function editEmployee(id,name,email,department){

document.getElementById("employeeId").value=id;

document.getElementById("name").value=name;

document.getElementById("email").value=email;

document.getElementById("department").value=department;

document.getElementById("saveBtn").innerHTML="Update Employee";

}

async function deleteEmployee(id){

if(confirm("Delete Employee?")){

await fetch(API+"/employees/"+id,{

method:"DELETE"

});

showMessage("Employee Deleted","red");

loadEmployees();

}

}

function searchEmployee(){

let value=document.getElementById("search").value.toLowerCase();

let filtered=employees.filter(emp=>

emp[1].toLowerCase().includes(value)

||

emp[2].toLowerCase().includes(value)

||

emp[3].toLowerCase().includes(value)

);

displayEmployees(filtered);

}

function clearForm(){

document.getElementById("employeeId").value="";

document.getElementById("name").value="";

document.getElementById("email").value="";

document.getElementById("department").value="";

}

function showMessage(msg,color){

let message=document.getElementById("message");

message.innerHTML=msg;

message.style.color=color;

setTimeout(()=>{

message.innerHTML="";

},3000);

}