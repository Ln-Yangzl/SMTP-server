import re
from flask import Flask, request
from flask_cors import CORS
import json
from service.mailStorage import MailStorage
from service.SMTPSender import MailSender

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # 允许跨域
    CORS(app, resources=r'/*')
    app.secret_key = 'div'

    # 注入service 依赖
    mailStorage = MailStorage()
    mailSender = MailSender()

    @app.route('/test', methods={'GET', 'POST'})
    def api_test():
        if request.method == 'GET':
            return "access success!"
        if request.method == 'POST':
            data = json.loads(request.data)
            print(data)
            # print(request.form.get('content'))
            return data

    @app.route('/sendmail', methods = {'POST'})
    def sendAndSaveMail():
        data = json.loads(request.data)
        print('/sendmail called!')
        print('get data:')
        print(data)
        mailSendStatus = mailSender.sendMails(**data)
        status = mailStorage.saveSendedMail(data)
        print('status: %d'%status)
        return 'mailStorage status: %d, mailSend status: %d'%(status, mailSendStatus)


    return app

if __name__=='__main__':
    app=create_app()
    app.run(
        host='0.0.0.0',
        port=8081,
        debug=True
    )