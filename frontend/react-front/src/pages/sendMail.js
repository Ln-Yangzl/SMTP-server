import SideBar from '../componets/sideBar'
import MailEditBox from '../componets/mailEditBox';

export default function SendMail(props) {

    

    return (
        <div className='main-content'>
            <SideBar />
            <div className='content-box'>
                <h2 className='content-header'>发送邮件</h2>
                
                <MailEditBox />
            </div>

        </div>
    );

}

