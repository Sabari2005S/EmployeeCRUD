import asyncio
from database import get_connection


async def test():
    conn = await get_connection()

    print("Connection Successful")

    await conn.ensure_closed()


asyncio.run(test())