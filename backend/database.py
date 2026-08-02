import os
import asyncmy

async def get_connection():
    connection = await asyncmy.connect(
        host=os.getenv("mysql.railway.internal"),
        port=int(os.getenv("3306")),
        user=os.getenv("root"),
        password=os.getenv("lmdFdWPrbkJmVODzETqxvHYgahwSrLuw"),
        database=os.getenv("railway"),
        autocommit=True,
    )
    return connection
