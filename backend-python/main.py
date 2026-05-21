from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal
import psycopg2
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
)

FilterableKey = Literal[
    "first_name", "last_name", "department", 
    "role", "salary", "is_active"
]

class Employee(BaseModel):
    id: int
    first_name: str
    last_name: str
    department: str
    role: str
    salary: float
    is_active: bool

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

@app.get("/employees", response_model=list[Employee])
def filter_and_sort(
    filterKey: FilterableKey = Query(...),
    filterValue: str = Query(...),
    sortKey: FilterableKey = Query(...)
):
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT * FROM employees WHERE {filterKey} = %s ORDER BY {sortKey}",
            (filterValue,)
        )
        rows = cur.fetchall()
        cols = ["id", "first_name", "last_name", "department", "role", "salary", "is_active"]
        return [Employee(**dict(zip(cols, row))) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/fields")
def get_fields():
    return ["first_name", "last_name", "department", "role", "salary", "is_active"]