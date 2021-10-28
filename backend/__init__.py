import re
from flask import Flask, request
from flask_cors import CORS
import json

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # 允许跨域
    CORS(app, resources=r'/*')
    app.secret_key = 'div'

    @app.route('/test', methods={'GET', 'POST'})
    def api_test():
        if request.method == 'GET':
            return "access success!"
        if request.method == 'POST':
            data = json.loads(request.data)
            print(data)
            # print(request.form.get('content'))
            return data


    return app

if __name__=='__main__':
    app=create_app()
    app.run(
        host='0.0.0.0',
        port=8081,
        debug=True
    )