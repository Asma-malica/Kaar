from flask import Flask, request, jsonify # Converts Python dictionaries/lists into JSON responses.
import json # parse JSON strings into Python objects and vice versa.
import os # interact with the operating system

app = Flask(__name__)
DB_FILE = 'mock-db.json'

#test alive api
@app.route('/', methods=['GET'])
def isAlive():
    return jsonify({"status":"API alvie","data":{}})


# Helper: Read from JSON file
def read_users():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, 'r') as f:
        return json.load(f)

# Helper: Write to JSON file
def write_users(users):
    with open(DB_FILE, 'w') as f:
        json.dump(users, f, indent=4)

# Create User
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    print("Request --> ",data)
    users = read_users()
    data['id'] = max([u['id'] for u in users], default=0) + 1  # Auto-increment ID
    users.append(data)
    write_users(users) # updating database
    return jsonify({"message": "User created", "user": data}) # response



# Get All Users
@app.route('/users', methods=['GET'])
def get_all_users():
    user_list = read_users()
    return jsonify({"message": "User Fetched", "user": user_list})


# Get Single User
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    users = read_users()
    user = None  # default if no match is found

    for u in users:
        if u['id'] == user_id:
            user = u
            break  # stop once the first match is found
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"})


# Update User
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    users = read_users()
    i = 0
    for user in users:
        if user['id'] == user_id:
            users[i].update(data)
            write_users(users)
            return jsonify({"message": "User updated", "user": users[i]})            
        i += 1
        
    return jsonify({"error": "User not found"})

# Delete User
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    users = read_users()
    new_users = []
    for u in users:
        if u['id'] != user_id:
            new_users.append(u)
            
    if len(new_users) == len(users):
        return jsonify({"error": "User not found"})
    write_users(new_users)
    return jsonify({"message": "User deleted"})

if __name__ == '__main__':
    app.run(debug=True)