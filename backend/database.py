import asyncmy


async def get_connection():
    try:
        connection = await asyncmy.connect(
            host="localhost",
            port=3306,
            user="root",
            password="root123",      # Change if your MySQL password is different
            database="employee_db",
            autocommit=True,
        )

        print("✅ MySQL Connected Successfully")

        return connection

    except Exception as e:
        print("❌ Database Connection Error:", e)
        raise