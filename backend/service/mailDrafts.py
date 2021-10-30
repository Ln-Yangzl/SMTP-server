from DAO.mailDraftsTable import MailDraftsTable

class MailDrafts:
    
    def __init__(self) -> None:
        self.mailDraftsTable = MailDraftsTable()

    def saveDraft(self, newItem:dict):
        status = self.mailDraftsTable.insertItem(**newItem)
        return status

    def getAllDrafts(self):
        res = self.mailDraftsTable.selectAllMails()
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

    def getDraftContentById(self, draftId):
        res = self.mailDraftsTable.queryMailContentById(draftId)
        if res == None:
            return {'status': 1, 'error': 'sql execute error !'}
        return {'status': 0, 'data': res}