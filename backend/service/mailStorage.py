from DAO.mailSendedTable import MailSendedTable


class MailStorage:

    def __init__(self):
        self.mailSendedTable = MailSendedTable()

    def saveSendedMail(self, newItem:dict):
        status = self.mailSendedTable.insertItem(**newItem)
        return status