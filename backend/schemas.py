from pydantic import BaseModel


class Employee(BaseModel):
    name: str
    email: str
    department: str