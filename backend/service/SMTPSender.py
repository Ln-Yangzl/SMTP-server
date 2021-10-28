from socket import *
from typing import Tuple
from email.base64mime import body_encode
from SMTPUtils import SMTPServerError
import ssl

class MailSender:

    def __init__(self,
                 mailServer:str = "smtp.qq.com",
                 serverPort:int = 587,
                 fromAddress:str = "565213263@qq.com",
                 username:str = "565213263@qq.com",
                 password:str = "jdczixsdezcmbdii"):
        self.mailServer = mailServer
        self.fromAddress = fromAddress
        self.username = username
        self.password = password
        self.clientSocket = socket(AF_INET, SOCK_STREAM)
        self.clientSocket.connect((mailServer, serverPort))  # connect只能接收一个参数
        recv = self.clientSocket.recv(1024).decode()
        if '220' != recv[:3]:
            raise SMTPServerError(f"220 reply not received from server!\n reveived: {recv}")

        self.sendHELO()
        self.buildSTLConnection()
        self.authentication()
    
    # template for send, use this to send commond easily
    def sendTemplate(self, commond:str = 'HELO ', content:str = 'Ln\r\n', replyExpect:str = None) -> None:
        print(f'starting {commond+content}')
        self.clientSocket.send((commond+content).encode())
        recv = ''
        if  replyExpect != None:
            recv = self.clientSocket.recv(1024).decode()
        if replyExpect != None and recv[:3]!=replyExpect:
            raise SMTPServerError(f"{commond} failed! \n {replyExpect} reply not received from server!\n reveived: {recv}")
        print(f'recv: {recv}')

    def sendHELO(self) -> None:
        self.sendTemplate('HELO ', 'Ln\r\n', '250')

    # @returns: STL version
    def buildSTLConnection(self) -> str:
        self.sendTemplate('STARTTLS', '\r\n', '220')
        context = ssl.create_default_context()
        self.clientSocket = context.wrap_socket(self.clientSocket, server_hostname=self.mailServer)
        return self.clientSocket.version()

    # 发送"AUTH PLAIN"命令，验证身份
    def authentication(self) -> None:
        user_pass_encode64 = body_encode(f"\0{self.username}\0{self.password}".encode('ascii'), eol='')
        self.clientSocket.sendall(f'AUTH PLAIN {user_pass_encode64}\r\n'.encode())
        recv = self.clientSocket.recv(1024).decode()
        if recv[:3] != '235':
            raise SMTPServerError(f"235 reply not received from server!\n reveived: {recv}")
        # print('auth seccess!')

    def sendMails(self, receivers:Tuple, subject:str, content:str):
    
        self.sendTemplate('MAIL FROM: ', f'<{self.fromAddress}>\r\n', '250')
        for receiver in receivers:
            self.sendTemplate('RCPT TO: ', f'<{receiver}>\r\n', '250')

        self.sendTemplate('DATA','\r\n', '354')

        self.sendTemplate('subject: ', subject + '\r\n')
        self.sendTemplate('from: ', f'<{self.fromAddress}>\r\n')
        for receiver in receivers:
            self.sendTemplate('to: ', f'<{receiver}>\r\n')
        self.sendTemplate('\r\n', content + '\r\n')
        self.sendTemplate('\r\n', '.\r\n', '250')
    
    def close(self):
        self.sendTemplate('QUIT', '\r\n', '221')

    


if __name__ == '__main__':
    mailSender = MailSender()
    receivers = ('565213263@qq.com', '462072107@qq.com')
    subject = 'test for SMTP commond'
    content = '\r\nabcd line1\r\ncdef line2\r\n'
    mailSender.sendMails(receivers, subject, content)
    mailSender.close()