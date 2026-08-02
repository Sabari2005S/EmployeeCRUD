import asyncmy

async def get_connection():
    connection = await asyncmy.connect(
        host="mysql.railway.internal",
        port=3306,
        user="root",
        password="lmdFdWPrbkJmVODzETqxvHYgahwSrLuw",
        database="railway",
        autocommit=True
    )
    return connection
