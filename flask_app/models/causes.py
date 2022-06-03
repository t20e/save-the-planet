from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re
email_pattern = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


class Cause:
    def __init__(self, data):
        self.id = data['id']
        self.name = data['name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.cause_id = data['cause_id']
        self.user_id = data['user_id']
        self.liked = data['liked']
        self.donation_amount = data['donation_amount']
    @classmethod
    def get_all_causes(cls):
        query = "SELECT * FROM causes"
        results = connectToMySQL('save_planet_schema').query_db(query)
        # print(results, 'results for get all causes')
        return results
    # when user likes create a table for that info in users_to_causes

    @classmethod
    def create_users_to_causes(cls, data):
        validateDbTamper = Cause.check_if_user_already_liked(data)
        if validateDbTamper != False:
            return True
        query = "INSERT INTO users_to_causes (cause_id, user_id, liked, created_at) VALUES (%(cause_id)s, %(user_id)s, 1, NOW() )"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        # print(results)
        return results
    @classmethod
    def checkIfUserAlreadyLikedForHomePage(cls, data):
        query = "SELECT * FROM causes LEFT JOIN users_to_causes on causes.id = users_to_causes.cause_id LEFT JOIN users on users_to_causes.user_id = users.id WHERE users.id = %(user_id)s"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        # print(results, '')
        return results

    # create a column with the donation in users_to_casues table
    @classmethod
    def donateToCause(cls, data):
        query = "INSERT INTO users_to_causes (user_id, cause_id, donation_amount, total_donation, last_donation_timestamp, liked, created_at) VALUES (%(user_id)s, %(cause_id)s, %(donation_amount)s, %(donation_amount)s, %(last_donation_timestamp)s, 1, NOW() )"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        return cls

    @classmethod
    def check_if_user_already_liked(cls, data):
        query = "SELECT liked FROM causes LEFT JOIN users_to_causes on causes.id = users_to_causes.cause_id LEFT JOIN users on users_to_causes.user_id = users.id WHERE users.id = %(user_id)s AND users_to_causes.cause_id = %(cause_id)s"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        # print(results)
        if len(results) < 1:
            return False
        return results
    @classmethod
    def update_users_to_cause_when_user_already_liked(cls, data):
        query_update_db = "UPDATE users_to_causes SET donation_amount = %(donation_amount)s, total_donation = %(donation_amount)s, last_donation_timestamp = %(last_donation_timestamp)s, updated_at = NOW()  WHERE user_id = %(user_id)s AND cause_id = %(cause_id)s;"
        results = connectToMySQL('save_planet_schema').query_db(
            query_update_db, data)
        print(results)
        return results

    # update when adding to total donations
    @classmethod
    def update_users_to_cause_table(cls, data):
        query_get_donation_amount = "SELECT total_donation FROM users_to_causes WHERE user_id = %(user_id)s AND cause_id = %(cause_id)s;"
        results = connectToMySQL('save_planet_schema').query_db(
            query_get_donation_amount, data)
        print(results, 'results!!!!!***')
        data['total_donation'] = data['donation_amount'] + results[0]['total_donation']
        query_update_db = "UPDATE users_to_causes SET donation_amount = %(donation_amount)s, total_donation = %(total_donation)s, last_donation_timestamp = %(last_donation_timestamp)s, updated_at = NOW() WHERE user_id = %(user_id)s AND cause_id = %(cause_id)s;"
        results = connectToMySQL('save_planet_schema').query_db(
            query_update_db, data)
        print(results)
        return results
    @classmethod
    def check_if_user_already_donated(cls, data):
        query = "SELECT donation_amount FROM causes LEFT JOIN users_to_causes on causes.id = users_to_causes.cause_id LEFT JOIN users on users_to_causes.user_id = users.id WHERE user_id = %(user_id)s AND cause_id = %(cause_id)s"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        print(results, 'result of already donated')
        if len(results) < 1 or results[0]['donation_amount'] == 0:
            return False
        return True
    @classmethod
    def get_recent_contributions(cls):
        query = "SELECT name, first_name, last_name, age, email, profile_pic, state, country, donation_amount, last_donation_timestamp  FROM causes LEFT JOIN users_to_causes on causes.id = users_to_causes.cause_id LEFT JOIN users on users_to_causes.user_id = users.id WHERE donation_amount > 0 ORDER BY users_to_causes.last_donation_timestamp DESC"
        results = connectToMySQL('save_planet_schema').query_db(query)
        return results
    @classmethod
    def update_recent_contributions(cls, data):
        query = "SELECT name, first_name, last_name, age, email, profile_pic, state, country, donation_amount, last_donation_timestamp  FROM causes LEFT JOIN users_to_causes on causes.id = users_to_causes.cause_id LEFT JOIN users on users_to_causes.user_id = users.id WHERE donation_amount > 0 AND last_donation_timestamp >= %(last_time_called)s ORDER BY users_to_causes.last_donation_timestamp DESC"
        results = connectToMySQL('save_planet_schema').query_db(query, data)
        print(results, 'result ffrom ne pull')
        return results
# validate
    @staticmethod
    def validateDonationForm(data):
        is_valid = True
        errors = [];
        if(data['user_id'] != data['current_user']):
            is_valid = False
            errors.append("please sign in")
        if data['cause_id'] == 15 or data['cause_id'] == 16 or data['cause_id'] == 17:
            is_valid = False
            errors.append("select a cause")
        if(data['donation_amount'] is None):
            is_valid = False
            errors.append("please enter a donation amount!")
        if len(data['first_name']) < 2 or len(data['last_name']) < 2:
            is_valid = False
            errors.append("names need to be more the 2 character")
        if not email_pattern.match(data['email']):
            is_valid = False
            errors.append("Not a valid Email!")
        if len(data['address']) < 3:
            is_valid = False
            errors.append("enter a valid address")
        if len(data['optional_apt']) is None:
            data['optional_apt'] = ' '
        if len(data['state']) < 2:
            is_valid = False
            errors.append("enter a valid state")
        if len(data['country']) < 2:
            is_valid = False
            errors.append("enter a valid country")
        if data['postal_code'] < 1000:
            errors.append("postal code needs to be more then 4 digits")
            is_valid = False
        if data['card_number'] < 15:
            errors.append("card number needs to be more then 14 digits")
            is_valid = False
        if data['cvv'] < 100:
            errors.append("cvv needs to be more then 2 cahracter")
            is_valid = False
        if data['expiration_date'] < 1000:
            errors.append("expiration date needs to be 4 digits")
            is_valid = False
        return data, is_valid, errors
    @staticmethod
    def validate_form_for_update(data):
        is_valid = True
        errors = [];
        if data['user_id'] != data['current_user']:
            is_valid = False
            errors.append('please sign in')
        if data['cause_id'] == 15 or data['cause_id'] == 16 or data['cause_id'] == 17:
            is_valid = False
            errors.append('select a cause')
        if not email_pattern.match(data['email']):
            is_valid = False
            errors.append('Not a valid Email!')
        if(data['donation_amount'] is None):
            is_valid = False
            errors.append('please enter a donation amount!')
        if data['card_number'] < 15:
            errors.append('card number needs to be more then 14 digits')
            is_valid = False
        if data['cvv'] < 100:
            errors.append('cvv needs to be more then 2 cahracter')
            is_valid = False
        if data['expiration_date'] < 1000:
            errors.append('expiration_date needs to be 4 digits')
            is_valid = False
        return data, is_valid, errors