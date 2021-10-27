from socket import *
from email.base64mime import body_encode

msg = "\r\n I love computer networks!"
endMsg = "\r\n.\r\n"
# 选择一个邮件服务
mailServer = "smtp.qq.com"
# 发送方地址和接收方地址，from 和 to
fromAddress = "565213263@qq.com"
toAddress = "565213263@qq.com"
# 发送方，验证信息，由于邮箱输入信息会使用base64编码，因此需要进行编码
username = "565213263@qq.com"  # 输入自己的用户名对应的编码
password = "jdczixsdezcmbdii"  # 此处不是自己的密码，而是开启SMTP服务时对应的授权码
# 创建客户端套接字并建立连接
serverPort = 587  # SMTP使用587号端口
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((mailServer, serverPort))  # connect只能接收一个参数
# 从客户套接字中接收信息
recv = clientSocket.recv(1024).decode()
print(recv)
if '220' != recv[:3]:
    print('220 reply not received from server.')

# 发送 HELO 命令并且打印服务端回复
heloCommand = 'HELO Alice\r\n'
clientSocket.send(heloCommand.encode())  # 随时注意对信息编码和解码
recv1 = clientSocket.recv(1024).decode()
print(recv1)

if '250' != recv1[:3]:
    print('250 reply not received from server.')
# 发送 HELO 命令并且打印服务端回复# 开始与服务器的交互，服务器将返回状态码250,说明请求动作正确完成
heloCommand = 'HELO MyName\r\n'
clientSocket.send(heloCommand.encode())  # 随时注意对信息编码和解码
recv1 = clientSocket.recv(1024).decode()
print(recv1)
if '250' != recv1[:3]:
    print('250 reply not received from server.')
# 发送"AUTH PLAIN"命令，验证身份.服务器将返回状态码334（服务器等待用户输入验证信息
user_pass_encode64 = body_encode(f"\0{username}\0{password}".encode('ascii'), eol='')
clientSocket.sendall(f'AUTH PLAIN {user_pass_encode64}\r\n'.encode())
recv2 = clientSocket.recv(1024).decode()
print(recv2)

# send mail
sendCommond = f'MAIL FROM: <{fromAddress}>\r\n'
# print(sendCommond)
clientSocket.send(sendCommond.encode())
recv3 = clientSocket.recv(1024).decode()
print(recv3)
if '250' != recv3[:3]:
    print('250 reply not received from server.')

sendCommond = f'RCPT TO: <{toAddress}>\r\n'
clientSocket.send(sendCommond.encode())
recv3 = clientSocket.recv(1024).decode()
print(recv3)
if '250' != recv3[:3]:
    print('250 reply not received from server.')


