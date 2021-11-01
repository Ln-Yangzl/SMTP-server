from typing import Iterable
from DAO.addressBookTable import AddressBookTable

class AddressBook:

    def __init__(self):
        self.addressBookTable = AddressBookTable()

    def saveAddress(self, newItem:dict):
        status = self.addressBookTable.insertItem(**newItem)
        return status

    def saveAddressList(self, addressList:Iterable):
        status = 0
        for item in addressList:
            status = status or self.saveAddress(item)
        return status


    def getAllAddress(self):
        res = self.addressBookTable.selectAll()
        if res != None:
            objectifyRes = []
            for item in res:
                objectifyRes.append({
                    "addressId": item[0],
                    "name": item[1],
                    "address": item[2],
                })
            
            res = {'status': 0, 'data': objectifyRes}
        else:
            res = {'status': 1, 'error': 'sql excute error!'}
        return res
    
    def deleteAddressById(self, id:int):
        res = self.addressBookTable.deleteById(id)
        if res != 0:
            return {'status': res, 'error': 'sql execute error !'}
        return {'status': 0}