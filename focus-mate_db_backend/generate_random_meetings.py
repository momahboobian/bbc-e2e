import random
import string
from datetime import datetime, timedelta
import sqlite3

conn = sqlite3.connect('person.db')


def generate_random_meeting_id(length=8):
    """Generate a random string for the meeting ID."""
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def add_random_meetings(conn_, n, days_in_past=365, days_in_future=365):
    c = conn_.cursor()
    c.execute('SELECT id FROM Person')
    ids = [row[0] for row in c.fetchall()]

    for _ in range(n):
        # Pick two random IDs for the meeting participants
        id1, id2 = random.sample(ids, 2)

        # Generate a random date between `days_in_past` days ago and `days_in_future` days from now
        start_date = datetime.now() - timedelta(days=days_in_past)
        end_date = datetime.now() + timedelta(days=days_in_future)
        time_between_dates = end_date - start_date
        random_number_of_days = random.randrange(time_between_dates.days)
        meeting_date = start_date + timedelta(days=random_number_of_days)

        # Generate a random meeting link
        meeting_id = generate_random_meeting_id()
        meeting_link = f"https://meet.google.com/{meeting_id}"

        # Insert the new meeting into the database
        c.execute('''
            INSERT INTO Meetings (person1_id, person2_id, meeting_dt, meeting_link)
            VALUES (?, ?, ?, ?)
        ''', (id1, id2, meeting_date.strftime('%Y-%m-%d %H:%M:%S'), meeting_link))

    conn.commit()


add_random_meetings(conn, 100)
conn.close()
