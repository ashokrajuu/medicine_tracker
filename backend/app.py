# backend/app.py

from flask import Flask
from flask_cors import CORS
from models import db, User, Patient, Medicine  # Import db instance from models
from routes import bp
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db with app context
db.init_app(app)

with app.app_context():
    db.create_all()
    def create_sample_data():
        # Check if there are any users in the database
        if not User.query.first():
            # Create sample users
            user1 = User(username='john_doe', password='password1')
            user2 = User(username='jane_smith', password='password2')
            db.session.add(user1)
            db.session.add(user2)
            db.session.commit()
            print("Sample users created.")

            # Create sample patients
            patient1 = Patient(name='Alice', age=25, gender='Female')
            patient2 = Patient(name='Bob', age=30, gender='Male')
            db.session.add(patient1)
            db.session.add(patient2)
            db.session.commit()
            print("Sample patients created.")

            # Create sample medicines
            medicine1 = Medicine(name='Paracetamol', dosage='500mg', patient=patient1)
            medicine2 = Medicine(name='Ibuprofen', dosage='200mg', patient=patient2)
            db.session.add(medicine1)
            db.session.add(medicine2)
            db.session.commit()
            print("Sample medicines created.")
        else:
            print("Sample data already exists. Skipping creation.")
    create_sample_data()




CORS(app)

app.register_blueprint(bp, url_prefix='/api')


#
# # CLI command to create sample data
# @app.cli.command("create_sample_data")
# @with_appcontext
# def create_sample_data():
#     # Create sample users
#     user1 = User(username='john_doe', password='password1')
#     user2 = User(username='jane_smith', password='password2')
#     db.session.add(user1)
#     db.session.add(user2)
#
#     # Create sample patients
#     patient1 = Patient(name='Alice', age=25, gender='Female')
#     patient2 = Patient(name='Bob', age=30, gender='Male')
#     db.session.add(patient1)
#     db.session.add(patient2)
#
#     # Create sample medicines
#     medicine1 = Medicine(name='Paracetamol', dosage='500mg', patient=patient1)
#     medicine2 = Medicine(name='Ibuprofen', dosage='200mg', patient=patient2)
#     db.session.add(medicine1)
#     db.session.add(medicine2)
#
#     # Commit changes to the database
#     db.session.commit()
#
#     print("Sample data created successfully.")

if __name__ == '__main__':
    app.run(debug=True)
