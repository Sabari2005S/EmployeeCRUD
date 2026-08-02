import asyncmy

async def get_connection():
    connection = await asyncmy.connect(
        host="altaria.proxy.rlwy.net",
        port=11569,
        user="root",
        password="lmdFdWPrbkJmVODzETqxvHYgahwSrLuw",
        database="railway",
        autocommit=True
    )
    return connection
