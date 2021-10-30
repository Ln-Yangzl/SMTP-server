import traceback
import pymysql
import time

from utils.databaseConfig import CONNECTION_KWADS

class MailDraftsTable:
    def __init__(self):
        self.db = pymysql.connect(**CONNECTION_KWADS)

    # 插入数据，正常返回0，错误返回1
    def insertItem(self, receivers:str, subject:str, content:str) -> int:
        cursor = self.db.cursor()
        if len(content) > 200 :
            # TODO: save it as a file
            content = content[:200]
        currentTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        sql = """
            insert into mail_drafts
            (receivers, subject, content, update_time)
            VALUES
            ('%s', '%s', '%s', '%s')
        """%(receivers, subject, content, currentTime)
        returnStatus = 0
        try:
            print('start to execute:')
            print(sql)
            cursor.execute(sql)
            self.db.commit()
            print('success !')
        except pymysql.Error:
            print('insert error !')
            self.db.rollback()
            traceback.print_exc()
            returnStatus = 1
        return returnStatus
    
    def selectAllMails(self) -> tuple:
        cursor = self.db.cursor()
        sql = """
            select mail_id, receivers, subject, update_time from mail_drafts
        """
        result = None
        try:
            print('start to execute:')
            print(sql)
            cursor.execute(sql)
            result = cursor.fetchall()
            print('success !')
        except pymysql.Error:
            print('select error !')
            traceback.print_exc()
        return result

    def queryMailContentById(self, mailId) -> str:
        cursor = self.db.cursor()
        sql = """
            select content from mail_drafts
            where mail_id = %d
        """%(mailId)
        result = None
        try:
            print('start to execute:')
            print(sql)
            cursor.execute(sql)
            result = cursor.fetchall()
            print('success !')
        except pymysql.Error:
            print('select error !')
            traceback.print_exc()
        return result
    
    def __del__(self):
        self.db.close()