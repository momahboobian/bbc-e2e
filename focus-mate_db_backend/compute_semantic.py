import sqlite3
import numpy as np
from scipy.spatial import distance
from transformers import AutoModel, AutoTokenizer, pipeline
import torch  # Import torch for GPU support

# Load the model and tokenizer
model_name = 'bert-base-uncased'
try:
    model = AutoModel.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    # Check GPU availability and use it if available
    device = 0 if torch.cuda.is_available() else -1
    feature_extractor = pipeline('feature-extraction', model=model, tokenizer=tokenizer, device=device)
except Exception as e:
    print(f"Error loading model or tokenizer: {e}")
    exit(1)

def get_embedding(text):
    try:
        features = feature_extractor(text)
        return np.mean(features[0], axis=0)
    except Exception as e:
        print(f"Error extracting features: {e}")
        return np.zeros((768,))

def compute_semantic_similarity(person1, person2):
    p1_info = ' '.join([person1[4], person1[8], person1[9]])
    p2_info = ' '.join([person2[4], person2[8], person2[9]])
    p1_embedding = get_embedding(p1_info)
    p2_embedding = get_embedding(p2_info)
    return 1 - distance.cosine(p1_embedding, p2_embedding)

conn = sqlite3.connect('person.db')
c = conn.cursor()
c.execute('SELECT * FROM Person')
people = c.fetchall()

try:
    for i in range(len(people)):
        for j in range(i + 1, len(people)):
            print(f"Processing pair {i} and {j}")  # Track progress
            person1 = people[i]
            person2 = people[j]
            similarity = compute_semantic_similarity(person1, person2)
            c.execute('''
                INSERT INTO Similarities (person1_id, person2_id, similarity)
                VALUES (?, ?, ?)
            ''', (person1[0], person2[0], similarity))
        print(f"Finished processing person {i}")  # Track progress
    conn.commit()
except Exception as e:
    print(f"Error during database operations: {e}")
finally:
    conn.close()
