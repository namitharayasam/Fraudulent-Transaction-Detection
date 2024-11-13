from flask import Flask, request, jsonify
import mysql.connector
import pickle
from sklearn.ensemble import RandomForestClassifier
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# MySQL connection
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",  # Update with your MySQL host
        user="root",       # Update with your MySQL username
        password="Namitha@2004", # Update with your MySQL password
        database="BankSystem"  # Update with your database name
    )
    return conn

# Load the trained ML model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get transaction data from frontend
    transaction_data = request.json  # Assumes a JSON payload

    # Process the data and format it for prediction
    # For now, I'll assume the frontend sends data as a JSON object with necessary features
    transaction_features = np.array([[
        transaction_data['id'], transaction_data['V4'], transaction_data['V7'], transaction_data['V3'],  # Example feature columns
        transaction_data['V10'], transaction_data['V11'], transaction_data['V12'],
        transaction_data['V14'], transaction_data['V17'], transaction_data['V18'],
        transaction_data['Amount']
    ]])

    # Predict using the model
    prediction = model.predict(transaction_features)

    # Store the prediction in the database
    conn = get_db_connection()
    cursor = conn.cursor()

    transaction_id = transaction_data['Transaction_ID']
    is_fraud = int(prediction[0])  # Convert prediction to integer (0 or 1)

    # Insert the prediction result into the database
    cursor.execute("""
        INSERT INTO Prediction (Is_Fraud, Is_Flagged, Transaction_ID)
        VALUES (%s, %s, %s)
        """, (is_fraud, is_fraud, transaction_id))  # Is_Flagged can be set to 1 if fraud

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"prediction": is_fraud, "message": "Prediction saved to database"})

if __name__ == '__main__':
    app.run(debug=True)

