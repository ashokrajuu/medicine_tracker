# backend/routes.py

from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Patient, Medicine

bp = Blueprint('api', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400
    #hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(username + password)
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    return jsonify({'message': 'Login successful'}), 200

@bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logout successful'}), 200

@bp.route('/patients', methods=['POST'])
def add_patient():
    data = request.get_json()
    new_patient = Patient(name=data['name'], age=data['age'], gender=data['gender'])
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({'message': 'Patient added successfully'}), 201

@bp.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'age': p.age, 'gender': p.gender} for p in patients]), 200

@bp.route('/medicines', methods=['POST'])
def add_medicine():
    data = request.get_json()
    patient = Patient.query.get(data['patient_id'])
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404
    new_medicine = Medicine(name=data['name'], dosage=data['dosage'], patient_id=patient.id)
    db.session.add(new_medicine)
    db.session.commit()
    return jsonify({'message': 'Medicine added successfully'}), 201

@bp.route('/medicines', methods=['GET'])
def get_medicines():
   # medicines = Medicine.query.all()
    medicines = db.session.query(Medicine, Patient).join(Patient).all()
    result = []
    for medicine, patient in medicines:
        result.append({
            'id': medicine.id,
            'name': medicine.name,
            'dosage': medicine.dosage,
            'patient_id': medicine.patient_id,
            'patient_name': patient.name
        })
    return jsonify(result), 200
    #return jsonify([{'id': m.id, 'name': m.name, 'dosage': m.dosage, 'patient_id': m.patient_id} for m in medicines]), 200
