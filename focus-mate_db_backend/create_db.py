import random
import sqlite3
from faker import Faker

# Connect to the database (this will create a new file if it doesn't exist)
conn = sqlite3.connect('person.db')
c = conn.cursor()

# Create tables
c.execute('''
    CREATE TABLE IF NOT EXISTS Person
    (id INTEGER PRIMARY KEY,
    name TEXT,
    gender TEXT,
    age INTEGER,
    profession TEXT,
    location TEXT,
    photo TEXT,
    contact TEXT,
    education TEXT,
    interests TEXT,
    email TEXT)
''')

c.execute('''
    CREATE TABLE IF NOT EXISTS Similarities
    (person1_id INTEGER,
    person2_id INTEGER,
    similarity REAL,
    PRIMARY KEY (person1_id, person2_id),
    FOREIGN KEY (person1_id) REFERENCES Person(id),
    FOREIGN KEY (person2_id) REFERENCES Person(id))
''')

c.execute('''
    CREATE TABLE IF NOT EXISTS Meetings
    (person1_id INTEGER,
    person2_id INTEGER,
    meeting_dt TEXT,
    meeting_link TEXT,
    PRIMARY KEY (person1_id, person2_id),
    FOREIGN KEY (person1_id) REFERENCES Person(id),
    FOREIGN KEY (person2_id) REFERENCES Person(id))
''')

conn.commit()

fake = Faker()

# Populate the Person table
for _ in range(100):
    name = fake.name()
    gender = fake.random_element(elements=('Male', 'Female'))
    age = fake.random_int(min=20, max=70)
    profession = fake.job()
    location = fake.city()
    photo = f"https://picsum.photos/seed/{random.randint(1, 1000)}/200/300"
    contact = fake.phone_number()
    education = fake.random_element(elements=('High School', 'Bachelor', 'Master', 'PhD'))
    interests = fake.text(max_nb_chars=200)
    email = fake.email()

    c.execute('''
        INSERT INTO Person (name, gender, age, profession, location, photo, contact, education, interests, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (name, gender, age, profession, location, photo, contact, education, interests, email))

conn.commit()
conn.close()
