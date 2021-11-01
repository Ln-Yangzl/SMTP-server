import traceback
import pymysql
from utils.databaseConfig import CONNECTION_KWADS

class AddressBookTable:
    def __init__(self):
        self.db = pymysql.connect(**CONNECTION_KWADS)

    def insertItem(self, name:str, address:str) -> int:
        cursor = self.db.cursor()
        sql = """
            insert into address_book
            (name, address)
            VALUES
            ('%s', '%s')
        """%(name, address)
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

    def selectAll(self) -> tuple:
        cursor = self.db.cursor()
        sql = """
            select address_id, name, address
            from address_book
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

    def deleteById(self, addressId:int) -> int:
        cursor = self.db.cursor() 
        sql = """
            delete from address_book
            where address_id = %d
        """%(addressId)
        returnStatus = 0
        try:
            print('start to  execute:')
            print(sql)
            cursor.execute(sql)
            self.db.commit()
            print("success !")
        except pymysql.Error:
            print("delete error !")
            self.db.rollback()
            returnStatus = 1
        return returnStatus

    def __del__(self):
        self.db.close()