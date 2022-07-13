from concurrent.futures import thread
from flask_app import app
from flask_app.controllers import routes # this connects routes file to server
from flask_app.controllers import user_route # this connects routes file to server


if __name__=="__main__":
    app.run(debug=True)
