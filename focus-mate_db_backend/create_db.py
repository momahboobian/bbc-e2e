import random
import sqlite3
from faker import Faker
from generate_random_meetings import generate_random_meeting_id  # Changed to absolute import

conn = sqlite3.connect('person.db')

c = conn.cursor()

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

# Create the Meetings table
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

# Populate the Meetings table
for _ in range(100):
    person1_id = fake.random_int(min=1, max=100)
    person2_id = fake.random_int(min=1, max=100)
    if random.random() < 0.7:
        # Generate a past meeting date/time
        meeting_dt = fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None).isoformat()
    else:
        # Generate a future meeting date/time
        meeting_dt = fake.date_time_this_year(before_now=False, after_now=True, tzinfo=None).isoformat()
    meeting_id = generate_random_meeting_id()
    meeting_link = f"https://meet.google.com/{meeting_id}"

    c.execute('''
        INSERT INTO Meetings (person1_id, person2_id, meeting_dt, meeting_link)
        VALUES (?, ?, ?, ?)
    ''', (person1_id, person2_id, meeting_dt, meeting_link))

conn.commit()

conn.close()
