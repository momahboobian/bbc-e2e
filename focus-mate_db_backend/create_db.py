# Description: Creates the database and populates it with fake data
import random
import sqlite3
from faker import Faker

conn = sqlite3.connect('person2.db')

c = conn.cursor()

c.execute('''
    CREATE TABLE Person
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
    CREATE TABLE Similarities
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
    photo = fake.image_url()
    contact = fake.phone_number()
    education = fake.random_element(elements=('High School', 'Bachelor', 'Master', 'PhD'))
    interests = fake.text(max_nb_chars=200)  # Arbitrary size limit
    email = fake.email()

    c.execute('''
        INSERT INTO Person (name, gender, age, profession, location, photo, contact, education, interests, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (name, gender, age, profession, location, photo, contact, education, interests, email))

conn.commit()



# Create the Meetings table
c.execute('''
    CREATE TABLE Meetings
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
    person1_id = fake.random_int(min=1, max=1000)
    person2_id = fake.random_int(min=1, max=1000)
    if random.random() < 0.7:
        # Generate a past meeting date/time
        meeting_dt = fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None).isoformat()
    else:
        # Generate a future meeting date/time
        meeting_dt = fake.date_time_this_year(before_now=False, after_now=True, tzinfo=None).isoformat()
    random_numbers = [random.randint(0, 9) for _ in range(10)]
    str_numbers = ''.join(str(n) for n in random_numbers)
    meeting_link = "https://bbc.zoom.us/j/" + str_numbers

    c.execute('''
        INSERT INTO Meetings (person1_id, person2_id, meeting_dt, meeting_link)
        VALUES (?, ?, ?, ?)
    ''', (person1_id, person2_id, meeting_dt, meeting_link))

conn.commit()

conn.close()
