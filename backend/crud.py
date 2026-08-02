from database import get_connection


# CREATE
async def create_employee(employee):
    try:
        print("1. Connecting...")
        conn = await get_connection()

        print("2. Creating Cursor...")
        cursor = conn.cursor()

        print("3. SQL Query...")
        query = """
        INSERT INTO employees (name, email, department)
        VALUES (%s, %s, %s)
        """

        print("4. Executing...")
        await cursor.execute(
            query,
            (
                employee.name,
                employee.email,
                employee.department,
            ),
        )

        print("5. Commit...")
        await conn.commit()

        print("6. Closing Cursor...")
        await cursor.close()

        print("7. Closing Connection...")
        await conn.ensure_closed()

        print("8. Success")

        return {"message": "Employee Added Successfully"}

    except Exception as e:
        print("========== ERROR ==========")
        print(type(e).__name__)
        print(e)
        print("===========================")
        raise


# READ
async def get_employees():
    conn = await get_connection()
    cursor = conn.cursor()

    await cursor.execute("SELECT * FROM employees")

    data = await cursor.fetchall()

    await cursor.close()
    await conn.ensure_closed()

    return data


# UPDATE
async def update_employee(id, employee):
    conn = await get_connection()
    cursor = conn.cursor()

    query = """
    UPDATE employees
    SET name=%s,
        email=%s,
        department=%s
    WHERE id=%s
    """

    await cursor.execute(
        query,
        (
            employee.name,
            employee.email,
            employee.department,
            id
        )
    )

    await conn.commit()

    await cursor.close()
    await conn.ensure_closed()

    return {"message": "Employee Updated Successfully"}


# DELETE
async def delete_employee(id):
    conn = await get_connection()
    cursor = conn.cursor()

    query = "DELETE FROM employees WHERE id=%s"

    await cursor.execute(query, (id,))

    await conn.commit()

    await cursor.close()
    await conn.ensure_closed()

    return {"message": "Employee Deleted Successfully"}