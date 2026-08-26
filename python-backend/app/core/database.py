import os
import motor.motor_asyncio

# ============================================================
# MONGODB SETUP (Python side) — YAHAN KYA KARNA HAI:
# 1. https://www.mongodb.com/cloud/atlas se connection string lo
# 2. python-backend/.env mein MONGODB_URI= ke aage paste karo
# 3. Bas — neeche wala client apne aap connect ho jaayega
# ============================================================

MONGODB_URI = os.getenv("MONGODB_URI", "")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "samadhansetu")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI) if MONGODB_URI else None
db = client[MONGODB_DB_NAME] if client else None

# Collections you'll use in routes:
#   db.users
#   db.problems
