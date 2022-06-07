from fileinput import filename
from flask import render_template, redirect, request,session, url_for, send_from_directory, flash
from flask_app import app
from flask_app.models.user import User
from flask_bcrypt import Bcrypt        
bcrypt = Bcrypt(app) 
from werkzeug.utils import secure_filename
import os
import uuid as uuid
from dotenv import load_dotenv
from pathlib import Path
import boto3 

allowed_file_extentions = { 'png', 'jpg', 'jpeg'}
upload_file_folder = 'flask_app/static/images/uploaded_files'
app.config['upload_file_folder'] = upload_file_folder

def allowed_files(file):
    return '.' in file and \
        file.rsplit('.', 1)[1].lower() in allowed_file_extentions


#  path to read the env file
dotenv_path = Path('flask_app/aws_connect.env')
load_dotenv(dotenv_path = dotenv_path)
#bucket s3
region = "us-west-2"
bucketNameClient = 'save-planet-images-s3'
s3 = boto3.client('s3')
# with open ('flask_app/static/images/causes/support_forest/deforest.jpeg', 'rb') as oneImg:
#     s3.upload_fileobj(oneImg, bucketName, 'deforest.jpeg')
#     print('uploaded, here')

@app.route('/save-planet/login')
def login():
    if 'user_visited' not in session:
        session['user_visited'] = 1
    else:
        session['user_visited'] += 1
    userVisted = session['user_visited']
    return render_template('login.html', userVisted =userVisted)

@app.route('/save-planet/loggin', methods=['POST'])
def loggin():
    session.clear()
    data ={
        'email' : request.form['email'],
        'password' : request.form['password']
    }
    holder = User.check_user_login(data)
    if not holder:
        flash('invalid password/invalid')
        return redirect('/save-planet/login')
    if not bcrypt.check_password_hash(holder.password, request.form['password']):
        flash('invalid password/invalid')
        return redirect('/save-planet/login')
    print(holder.first_name, 'holder')
    session['first_name'] = holder.first_name.capitalize()
    session['last_name'] = holder.last_name.capitalize()
    session['email'] = holder.email
    session['id'] = holder.id
    return redirect('/save-planet')

@app.route('/save-planet/logout')
def logout():
   session.clear()
   return redirect('/save-planet')

@app.route('/save-planet/reg')
def reg():
    if 'user_visited' not in session:
        session['user_visited'] = 1
    else:
        session['user_visited'] += 1
    userVisted = session['user_visited']
    return render_template('reg.html', userVisted = userVisted)

@app.route('/save-planet/registering', methods=['POST'])
def create_user():
    session.clear()
    pfp = request.files['pfp']
    pic_name = None
    if pfp.filename != '':
        if pfp and allowed_files(pfp.filename):
            filename = secure_filename(pfp.filename)
            pic_name = str(uuid.uuid1()) + '_' + filename
            #  image upload 
            #get the url for that user and save the whole url to the db
            s3.upload_fileobj(pfp, bucketNameClient, 'client/{}'.format(pic_name))
            # get url back
            pic_name = f'https://save-planet-images-s3.s3.amazonaws.com/client/{pic_name}'
        else:
            flash('profile picture needs to be in either jpeg, png, or jpg')
            return redirect('/save-planet/reg')
    data = {
        "first_name" : request.form['first_name'],
        "last_name" : request.form['last_name'],
        "age" : request.form['age'],
        "email" : request.form['email'],
        "password" : request.form['password'],
        "confirmPassword" : request.form['confirmPassword'],
    }
    #set pic nameto the dadebase
    data['pfp'] = pic_name
    # validata data 
    if not User.check_registration_fields(data):
        print('valid field register data')
    else:
        return redirect('/save-planet/reg')
    holder = bcrypt.generate_password_hash(request.form['password'])
    data['password'] = holder
    del data['confirmPassword']
    create = User.create_user(data)
    # ? make user first name session from query rather then doing it from data['first_name]
    session['first_name'] = data['first_name'].capitalize()
    session['last_name'] = data['last_name'].capitalize()
    session['email'] = data['email']
    session['id'] = create
    return redirect('/save-planet')
    

