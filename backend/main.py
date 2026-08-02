from fastapi import FastAPI
from schemas import Employee
from fastapi.middleware.cors import CORSMiddleware

from crud import (
    create_employee,
    get_employees,
    update_employee,
    delete_employee
)

app = FastAPI()

origins = [
    "https://employee-crud-vert.vercel.app",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Employee Management API"}


@app.get("/employees")
async def employees():
    return await get_employees()


@app.post("/employees")
async def add_employee(employee: Employee):
    return await create_employee(employee)


@app.put("/employees/{id}")
async def edit_employee(id: int, employee: Employee):
    return await update_employee(id, employee)


@app.delete("/employees/{id}")
async def remove_employee(id: int):
    return await delete_employee(id)
