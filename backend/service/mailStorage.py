from DAO.mailSendedTable import MailSendedTable

class MailStorage:

    def __init__(self):
        self.mailSendedTable = MailSendedTable()

    def saveSendedMail(self, newItem:dict):
        status = self.mailSendedTable.insertItem(**newItem)
        return status

    def getAllSendedMails(self):
        res = self.mailSendedTable.selectAllMails()
        # print(res)
        if res != None:
            # 对象化res为适用格式
            objectifiedRes = []
            for item in res:
                objectifiedRes.append({
                    'mailId': item[0],
                    'receivers': item[1],
                    'subject': item[2],
                    'sendTime': str(item[3]),
                })
            res = {'status': 0, 'data': objectifiedRes}
        else:
            res = {'status': 1, 'error': 'sql execute error !'}
        return res

    def getMailContentById(self, mailId):
        res = self.mailSendedTable.queryMailContentById(mailId)
        if res == None:
            return {'status': 1, 'error': 'sql execute error !'}
        return {'status': 0, 'data': res}

    def deleteMailById(self, mailId):
        status = self.mailSendedTable.deleteById(mailId)
        if status != 0:
            return {'status': status, 'error': 'sql execute error !'}
        return {'status': 0}
