import sqlite3

import numpy as np
from scipy.spatial import distance
from transformers import AutoModel, AutoTokenizer, pipeline

# Load the model and tokenizer
model_name = 'bert-base-uncased'
model = AutoModel.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Create a pipeline
feature_extractor = pipeline(
    'feature-extraction', model=model, tokenizer=tokenizer)


def get_embedding(text):
    # Get the features and convert to a numpy array
    features = feature_extractor(text)

    # For simplicity, let's take the mean of all token vectors.
    # You could also use other strategies, like taking the [CLS] token (first one).
    return np.mean(features[0], axis=0)


def compute_semantic_similarity(person1, person2):
    p1_info = ' '.join([person1[4], person1[8], person1[9]]
                       )  # profession, education, interests
    p2_info = ' '.join([person2[4], person2[8], person2[9]]
                       )  # profession, education, interests
    p1_embedding = get_embedding(p1_info)
    p2_embedding = get_embedding(p2_info)

    return 1 - distance.cosine(p1_embedding, p2_embedding)  # cosine similarity


conn = sqlite3.connect('person.db')

c = conn.cursor()
c.execute('SELECT * FROM Person')
people = c.fetchall()

for i in range(50):
    for j in range(i+1, 60):
        person1 = people[i]
        person2 = people[j]
        similarity = compute_semantic_similarity(person1, person2)

        c.execute('''
            INSERT INTO Similarities (person1_id, person2_id, similarity)
            VALUES (?, ?, ?)
        ''', (person1[0], person2[0], similarity))

conn.commit()
conn.close()
