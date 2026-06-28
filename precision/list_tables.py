import sqlite3
import shutil
import os

def main():
    db_path = 'prisma/dev.db'
    copy_path = 'prisma/dev_copy.db'
    
    print("Copying database to inspect without lock...")
    try:
        shutil.copyfile(db_path, copy_path)
        print("Copy successful.")
    except Exception as e:
        print("Failed to copy database:", e)
        return

    try:
        conn = sqlite3.connect(copy_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print("Tables in dev.db:", [t[0] for t in tables])
        
        # Also print structure of Company and JobRole if they exist
        for table in ['Company', 'JobRole', 'Employee', 'Team']:
            try:
                cursor.execute(f"PRAGMA table_info({table});")
                info = cursor.fetchall()
                print(f"Table info for {table}:", info)
                
                cursor.execute(f"SELECT COUNT(*) FROM {table};")
                count = cursor.fetchone()[0]
                print(f"Count for {table}: {count}")
            except Exception as e:
                print(f"Failed to get info/count for {table}:", e)
                
        conn.close()
    except Exception as e:
        print("Error checking tables:", e)
    finally:
        if os.path.exists(copy_path):
            os.remove(copy_path)
            print("Temporary copy removed.")

if __name__ == '__main__':
    main()
