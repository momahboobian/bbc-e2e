from datetime import datetime
import sqlite3
import random
from dateutil.parser import parse

from flask import Flask, g, render_template, jsonify
from flask_cors import cross_origin

from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)  # to enable Cross-Origin Resource Sharing

DATABASE = 'person.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def find_matches(conn, id_int):
    c = conn.cursor()

    c.execute('''
        SELECT person2_id, similarity FROM Similarities
        WHERE person1_id = ? AND similarity > 0.5
        ORDER BY similarity DESC
    ''', (id_int,))

    match_ids_and_scores = c.fetchall()

    matches = []
    for match_id, score in match_ids_and_scores:
        c.execute('SELECT * FROM Person WHERE id = ?', (match_id,))
        person = c.fetchone()

        match = {'id': person[0],
                 'name': person[1],
                 'gender': person[2],
                 'age': person[3],
                 'profession': person[4],
                 'location': person[5],
                 'photo': person[6],
                 'contact': person[7],
                 'education': person[8],
                 'interests': person[9],
                 'email': person[10],
                 'similarity': score}

        matches.append(match)

    return matches[:10]


@app.route('/api/persons')
@cross_origin()
def get_all_persons_api():
    conn = get_db()
    persons = get_all_persons(conn)
    return jsonify(persons)


def get_main_person(conn, id_int):
    c = conn.cursor()

    # Fetch person with the given id
    c.execute('SELECT * FROM Person WHERE id = ?', (id_int,))
    person = c.fetchone()

    # Fetch meetings for the person
    c.execute('SELECT meeting_dt, meeting_link FROM Meetings WHERE person1_id = ? OR person2_id = ? ORDER BY meeting_dt DESC', (id_int, id_int))
    meetings = c.fetchall()

    # Separate meetings into past and upcoming
    past_meetings = [meeting for meeting in meetings if parse(
        meeting[0]) < datetime.now()]
    upcoming_meetings = [meeting for meeting in meetings if parse(
        meeting[0]) >= datetime.now()]

    main_person = {'id': person[0],
                   'name': person[1],
                   'gender': person[2],
                   'age': person[3],
                   'profession': person[4],
                   'location': person[5],
                   'photo': person[6],
                   'contact': person[7],
                   'education': person[8],
                   'interests': person[9],
                   'email': person[10],
                   'past_meetings': past_meetings,
                   'upcoming_meetings': upcoming_meetings}

    return main_person


def get_all_persons(conn):
    c = conn.cursor()

    c.execute('SELECT * FROM Person')
    persons = c.fetchall()

    all_persons = []
    for person in persons:
        main_person = {
            'id': person[0],
            'name': person[1],
            'gender': person[2],
            'age': person[3],
            'profession': person[4],
            'location': person[5],
            'photo': person[6],
            'contact': person[7],
            'education': person[8],
            'interests': person[9],
            'email': person[10]
        }

        main_person['matches'] = find_matches(conn, main_person['id'])

        all_persons.append(main_person)

    return all_persons


@app.route('/api/matches/<int:person_id>')
@cross_origin()
def get_matches_api(person_id):
    conn = get_db()
    matches = find_matches(conn, person_id)
    return jsonify(matches)


@app.route('/')
def home():
    # Just using a random ID for this example
    main_person_id = random.randint(1, 100)
    main_person = get_main_person(get_db(), main_person_id)
    matches = find_matches(get_db(), main_person_id)

    return render_template('index.html', main_person=main_person, matches=matches)


if __name__ == "__main__":
    app.run(debug=True)
