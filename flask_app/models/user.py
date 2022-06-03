from flask_app.config.mysqlconnection import connectToMySQL
# this folder is for all classes models that we are controlling
import re
from flask import flash
email_pattern = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
names_validators = re.compile("^[a-zA-Z]+$")


class User:
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.age = data['age']
        self.email = data['email']
        self.password = data['password']
        self.profile_pic = data['profile_pic']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.address = data['address']
        self.optional_apt = data['optional_apt']
        self.state = data['state']
        self.country = data['country']
        self.postal_code = data['postal_code']

    @classmethod
    def create_user(cls, data):
        # add pfp
        query = "INSERT INTO users (first_name, last_name, age, email, password, profile_pic, created_at) VALUES (%(first_name)s, %(last_name)s, %(age)s, %(email)s,  %(password)s, %(pfp)s, NOW())"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        print(results, '*******************2435')
        return results
    # //validate

    @classmethod
    def check_if_email_exists(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL("save_planet_schema").query_db(query, data)
        # Didn't find a matching user
        print(result)
        if len(result) < 1:
            return False
        return True

    # //find one user
    @classmethod
    def find_one_user(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        result = connectToMySQL("save_planet_schema").query_db(query, data)
        if result == False or  len(result) < 1:
            return False
        return cls(result[0])

    @classmethod
    def check_user_login(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL('save_planet_schema').query_db(query, data)
        # print(result)
        if len(result) < 1:
            return False
        return cls(result[0])
    # update user when user donates

    @classmethod
    def update_user(cls, data):
        query = "UPDATE users SET address = %(address)s, optional_apt = %(optional_apt)s, state = %(state)s, postal_code = %(postal_code)s, country = %(country)s, updated_at = NOW() WHERE id = %(user_id)s;"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        return print('updated user')

    @classmethod
    def manyTOmanyCall(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        query = "	SELECT * FROM causes JOIN users_to_causes ON users_to_causes.cause_id = %(cause_id)s JOIN users ON users_to_causes.user_id = %(user_id)s;"
        result = connectToMySQL('save_planet_schema').query_db(query, data)
        print(result)
        if len(result) < 1:
            return False
        return cls(result[0])

    @staticmethod
    def check_registration_fields(data):
        #  make age between 13-150 make sure it cant go negative
        not_valid = False
        if data['password'] != data['confirmPassword']:
            not_valid = True
            flash('passowords do not match')
        if len(data['password']) < 8:
            not_valid = True
            flash('password needs to be more then 8 characters!')
        if not email_pattern.match(data['email']):
            not_valid = True
            flash('Not a valid Email!')
        if not names_validators.match(data['first_name']):
            if len(data['first_name']) < 2:
                flash('first name needs to be at least 2 characters and all letters')
                not_valid = True
        if not names_validators.match(data['last_name']):
            if len(data['last_name']) < 2:
                flash('Last name needs to be at least 2 characters and all letters')
                not_valid = True
        email_holder = data['email'].split('@')
        if email_holder == data['email'].split('@'):
            if len(email_holder[0]) > 2:
                holder = User.check_if_email_exists(data)
                if holder != False:
                    flash("email already exists")
                    print("email already exists")
                    not_valid = True
            elif len(email_holder[0]) < 2:
                flash('email needs to be more then 2 charaters')
                not_valid = True
        return not_valid
