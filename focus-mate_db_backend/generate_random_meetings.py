import random
import string
from datetime import datetime, timedelta
import sqlite3

def generate_meeting_link():
    def random_segment(length):
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))
    
    return f"https://meet.google.com/{random_segment(3)}-{random_segment(4)}-{random_segment(3)}"

def add_random_meetings(conn_, n, days_in_past=365, days_in_future=365):
    c = conn_.cursor()
    c.execute('SELECT id FROM Person')
    ids = [row[0] for row in c.fetchall()]

    for _ in range(n):
        id1, id2 = random.sample(ids, 2)
        start_date = datetime.now() - timedelta(days=days_in_past)
        end_date = datetime.now() + timedelta(days=days_in_future)
        time_between_dates = end_date - start_date
        random_number_of_days = random.randrange(time_between_dates.days)
        meeting_date = start_date + timedelta(days=random_number_of_days)

        # Generate the meeting link
        meeting_link = generate_meeting_link()

        try:
            c.execute('''
                INSERT INTO Meetings (person1_id, person2_id, meeting_dt, meeting_link)
                VALUES (?, ?, ?, ?)
            ''', (id1, id2, meeting_date.strftime('%Y-%m-%d %H:%M:%S'), meeting_link))
        except sqlite3.IntegrityError:
            # Skip duplicate entries
            continue

    conn_.commit()

conn = sqlite3.connect('person.db')
add_random_meetings(conn, 100)
conn.close()
