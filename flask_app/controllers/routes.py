from flask import Flask, render_template, redirect, request, session, url_for, jsonify
from flask_app import app
from flask_app.models.user import User
from flask_app.models.causes import Cause
from datetime import datetime

@app.errorhandler(404)
def not_fount(e):
    return render_template('404.html'), 404

@app.route('/save-planet')
def home():
    # //get all causes
    if 'user_visited' not in session:
        session['user_visited'] = 1
    else:
        session['user_visited'] += 1
    userVisted = session['user_visited']
    user = ""
    allCauses = Cause.get_all_causes()
    # //pull data to see if user already liked or donated then adjust html page with that data
    userAlreadyContributed = {
        'name': 'none',
        'liked': 0,
        'donation_amount': 0
    }
    cardData = ['']
    if 'id' in session:
        data ={'id' : session['id']}
        user = User.find_one_user(data)
        cardData = ['American Express', 'Discover', 'MasterCard', 'Visa']
        data = {
            'user_id': session['id']
        }
        checkIfUserAlreadyLikedForHomePage_donated = Cause.checkIfUserAlreadyLikedForHomePage(data)
        if not checkIfUserAlreadyLikedForHomePage_donated:
            print("user hasn't made any contributions")
        else:
            userAlreadyContributed = checkIfUserAlreadyLikedForHomePage_donated
    return render_template('main.html', allCauses=allCauses, userAlreadyContributed=userAlreadyContributed, cardData=cardData, user = user, userVisted = userVisted)

@app.route('/api/save-planet/likedCause', methods=['POST'])
def liked_a_cause():
    json = request.get_json()
    data = {
        'user_id': int(json['user_id_for_like']),
        'cause_id': int(json['cause_id_for_like']),
    }
    # print(data)
    userTOCause = Cause.create_users_to_causes(data)
    if userTOCause == True:
        # //tampering
        print('user tampering')
        return jsonify({"temperingCheck": "failed"})
    return jsonify({"succesfullly": "liked"})


@app.route('/api/save-planet/donateToCause', methods=['POST'])
def donate_to_cause():
    json = request.get_json()
    utc_time_stamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    if 'address' in json:
        donation_amount = json['donation_amount'][1:]
        data = {
            'user_id': int(json['user_id']),
            'cause_id': json['cause_id'],
            'current_user': session['id'],
            'donation_amount': int(donation_amount),
            'first_name': json['first_name'],
            'last_name': json['last_name'],
            'email': json['email'],
            'address': json['address'],
            'optional_apt': json['OptionalApt'],
            'state': json['state'],
            'country': json['country'],
            'postal_code': int(json['postal_code']),
            'last_donation_timestamp': utc_time_stamp,
            'name_on_card': json['name_on_card'],
            'card_type': json['card_type'],
            'card_number': int(json['card_number']),
            'cvv': int(json['cvv']),
            'expiration_date': int(json['expiration_date'])
        }
        validateData = Cause.validateDonationForm(data)
        if validateData[1] == False:
            print('validation is false')
            return jsonify({"validation_successful": "false", "errors": validateData[2]})
        #check out if user already donated if they did then return error
        checkUserDonation = Cause.check_if_user_already_donated(data)
        if checkUserDonation == True:
            return jsonify({"temperingCheck": "failed"})
        dataToAddToManyTable = {
            'user_id': validateData[0]['user_id'],
            'cause_id': validateData[0]['cause_id'],
            'donation_amount': validateData[0]['donation_amount'],
            'last_donation_timestamp': utc_time_stamp,
        }
        # check if user already liked then update the table
        checkIfUserAlreadyLikedForHomePage = Cause.check_if_user_already_liked(
            dataToAddToManyTable)
        if checkIfUserAlreadyLikedForHomePage == False:
            Cause.donateToCause(dataToAddToManyTable)
        else:
            Cause.update_users_to_cause_when_user_already_liked(
                dataToAddToManyTable)
        # dont save cvv etc to db
        dataToUpdateUser = {
            'address': validateData[0]['address'],
            'optional_apt': validateData[0]['optional_apt'],
            'state': validateData[0]['state'],
            'country': validateData[0]['country'],
            'postal_code': validateData[0]['postal_code'],
            'user_id': session['id']
        }
        User.update_user(dataToUpdateUser)
        return jsonify({"success":"true"})
    else:
        # update donation amount here
        donation_amount = json['donation_amount'][1:]
        data = {
            'user_id': int(json['user_id']),
            'current_user': session['id'],
            'cause_id': json['cause_id'],
            'email': json['email'],
            'donation_amount': int(donation_amount),
            'last_donation_timestamp': utc_time_stamp,
            'name_on_card': json['name_on_card'],
            'card_type': json['card_type'],
            'card_number': int(json['card_number']),
            'cvv': int(json['cvv']),
            'expiration_date': int(json['expiration_date'])
        }
        # validate form
        validateData = Cause.validate_form_for_update(data)
        print(validateData, 'validateData ****')
        if validateData[1] == False:
            print('validation is false', validateData)
            return jsonify({"validation_successful": "false", "errors": validateData[2]})
        # pull data to get how much they have preversly donatated then add to the sum update = NOW()
        Cause.update_users_to_cause_table(data)
    return jsonify({"message": "succesfully added donation to db"})

@app.route('/save-planet/about_us')
def about_us_page():
    if 'user_visited' not in session:
        session['user_visited'] = 1
    else:
        session['user_visited'] += 1
    userVisted = session['user_visited']
    return render_template('aboutUs.html', userVisted = userVisted)

    # set api call
@app.route('/api/save-planet/recentContributions')
def recentContributions():
    return jsonify(Cause.get_recent_contributions())
    # setup new api for updating recent contribution when user is active on site

@app.route('/api/save-planet/updateRecentContributions<lastTimeCalled>')
def updateRecentContributions(lastTimeCalled):
    # current date and time
    # new_time_call = datetime.now()
    data = {
        # 'new_time_call':  new_time_call.strftime("%Y-%m-%d %H:%M:%S"),
        'last_time_called': lastTimeCalled,
    }
    print(data)
    results = Cause.update_recent_contributions(data)
    return jsonify(results)
