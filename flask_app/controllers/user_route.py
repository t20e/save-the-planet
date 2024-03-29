import boto3
from pathlib import Path
from dotenv import load_dotenv
import uuid as uuid
import os
from werkzeug.utils import secure_filename
from fileinput import filename
from flask import render_template, redirect, request, session, url_for, send_from_directory, flash
from flask_app import app
from flask_app.models.user import User
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

# allow users to upload files to a folder in the web app directory
# upload_file_folder = 'flask_app/static/images/uploaded_files'
# app.config['upload_file_folder'] = upload_file_folder


allowed_file_extentions = {'png', 'jpg', 'jpeg'}
def allowed_files(file):
    return '.' in file and \
        file.rsplit('.', 1)[1].lower() in allowed_file_extentions


#  path to read the env file
dotenv_path = Path('flask_app/aws_connect.env')
load_dotenv(dotenv_path=dotenv_path)


# bucket s3
region = "us-east-1"
bucketNameClient = os.getenv("BUCKET_NAME_CLIENT")
s3 = boto3.client('s3')


@app.route('/login')
def login():
    if 'user_visited' not in session:
        session['user_visited'] = 1
    else:
        session['user_visited'] += 1
    userVisted = session['user_visited']
    return render_template('login.html', userVisted=userVisted)


@app.route('/logging_in', methods=['POST'])
def loggin():
    session.clear()
    data = {
        'email': request.form['email'],
        'password': request.form['password']
    }
    holder = User.check_user_login(data)
    if not holder:
        flash('invalid password/invalid')
        return redirect('/login')
    if not bcrypt.check_password_hash(holder.password, request.form['password']):
        flash('invalid password/invalid')
        return redirect('/login')
    print(holder.first_name, 'holder')
    session['first_name'] = holder.first_name.capitalize()
    session['last_name'] = holder.last_name.capitalize()
    session['email'] = holder.email
    session['id'] = holder.id
    return redirect('/')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@app.route('/reg')
def reg():
    if 'user_visited' not in session:
        session['user_visited'] = 1
    else:
        session['user_visited'] += 1
    userVisted = session['user_visited']
    return render_template('reg.html', userVisted=userVisted)


@app.route('/registering', methods=['POST'])
def create_user():
    session.clear()
    pfp = request.files['pfp']
    pic_name = None
    if pfp.filename != '':
        if pfp and allowed_files(pfp.filename):
            filename = secure_filename(pfp.filename)
            pic_name = str(uuid.uuid1()) + '_' + filename
            #  image upload
            # get the url for that user and save the whole url to the db
            s3.upload_fileobj(pfp, bucketNameClient,
                              'client/{}'.format(pic_name))
            # get url back
            pic_name = f'https://portfolio-avis-s3.s3.amazonaws.com/client/{pic_name}'
        else:
            flash('profile picture needs to be in either jpeg, png, or jpg')
            return redirect('/reg')
    data = {
        "first_name": request.form['first_name'],
        "last_name": request.form['last_name'],
        "age": request.form['age'],
        "email": request.form['email'],
        "password": request.form['password'],
        "confirmPassword": request.form['confirmPassword'],
    }
    data['pfp'] = pic_name
    # validata data
    if not User.check_registration_fields(data):
        print('valid field register data')
    else:
        return redirect('/reg')
    holder = bcrypt.generate_password_hash(request.form['password'])
    data['password'] = holder
    del data['confirmPassword']
    create = User.create_user(data)
    # ? make user first name session from query rather then doing it from data['first_name]
    session['first_name'] = data['first_name'].capitalize()
    session['last_name'] = data['last_name'].capitalize()
    session['email'] = data['email']
    session['id'] = create
    return redirect('/')
