import re
from flask import Flask, request
from flask_cors import CORS
import json
from service.mailStorage import MailStorage
from service.SMTPSender import MailSender
from service.mailDrafts import MailDrafts
import yaml

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # 允许跨域
    CORS(app, resources=r'/*')
    app.secret_key = 'div'

    # 注入service 依赖
    mailStorage = MailStorage()
    mailDrafts = MailDrafts()
    mailSender = MailSender(**getSMTPSenderKwargs())

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
        mailStorageStatus = mailStorage.saveSendedMail(data)
        info = 'mailStorage status: %d, mailSend status: %d'%(mailStorageStatus, mailSendStatus)
        print(info)


        return {'status': mailSendStatus or mailStorageStatus, 'error': info}

    @app.route('/saveDraft', methods = {'POST'})
    def saveDraft():
        data = json.loads(request.data)
        print('/saveDraft called!')
        print('get data:')
        print(data)
        saveStatus = mailDrafts.saveDraft(data)
        error = ''
        if saveStatus!=0:
            error = 'saveDraft failed!'
        return {'status': saveStatus, 'error': error}


    @app.route('/getAllSendedMails', methods={'GET'})
    def getAllSendedMails():
        return mailStorage.getAllSendedMails()

    @app.route('/getMailContent', methods={"GET"})
    def getMailContent():
        mailId = request.args.get("mailId")
        if mailId == None:
            return {'status': 1, 'error': '缺失请求参数'}
        return mailStorage.getMailContentById(int(mailId))

    @app.route('/getAllDrafts', methods={"GET"})
    def getAllDrafts():
        return mailDrafts.getAllDrafts()

    @app.route('/getDraftContent' , methods={"GET"})
    def getDraftContent():
        mailId = request.args.get("mailId")
        if mailId == None:
            return {'status': 1, 'error': '缺失请求参数'}
        return mailDrafts.getDraftContentById(int(mailId))

    return app

def getSMTPSenderKwargs() -> dict:
    file = open('./utils/SMTPSenderConfig.yaml')
    kwargs = yaml.load(file.read(), Loader=yaml.Loader)
    file.close()
    print('read SMTPSenderConfig.yaml:')
    print(kwargs)
    return kwargs
    

if __name__=='__main__':
    app=create_app()
    app.run(
        host='0.0.0.0',
        port=8081,
        debug=True
    )