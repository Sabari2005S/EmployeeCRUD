import asyncio
from database import get_connection

async def test():
    conn = await get_connection()

    print("Connection:", conn)

    cursor = conn.cursor()

    print("Cursor:", cursor)
    print("Cursor type:", type(cursor))

    await cursor.close()
    conn.close()

asyncio.run(test())