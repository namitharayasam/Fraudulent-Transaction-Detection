import pickle
import numpy as np

# Load the trained ML model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Example test data (replace with actual data)
test_data = np.array([[1, 0, 3, 1, 2, 3, 1, 2, 0, 100, 9]])  # Replace with your actual features

# Make a prediction
prediction = model.predict(test_data)

# Print the prediction result
print("Prediction:", prediction)

