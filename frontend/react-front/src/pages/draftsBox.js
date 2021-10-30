import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SideBar from '../componets/sideBar'
import MailEditBox from '../componets/mailEditBox';


export default function DraftsBox(props){
    const [mails, setMails] = useState([]);
    const [showEditBox, setShowEditBox] = useState(false);
    const [mailProps, setMailProps] = useState({
        receivers: '',
        subject: '',
        content: '',
    });

    const handleViewMail = (mailIndex) => {
        let mailInfo = mails[mailIndex];
        let url = React.$getUrl('/getDraftContent?mailId=' + mailInfo.mailId);
        axios.get(url).then((response) => {
            let responseBody = response.data;
            if (responseBody.status === 0) {
                setMailProps({
                    receivers: mailInfo.receivers,
                    subject: mailInfo.subject,
                    content: responseBody.data,
                });
                setShowEditBox(true);
            } else {
                React.$logCommonError(responseBody);
            }
        }).catch((response) => {
            React.$logRuntimeError(response)
        })
    }

    useEffect(() => {
        let url = React.$getUrl('/getAllDrafts');
        axios.get(url).then((response) => {
            let responseBody = response.data;
            console.log(responseBody)
            if (responseBody.status === 0) {
                setMails(responseBody.data)
            } else {
                React.$logCommonError(responseBody)
            }
        }).catch((response) => {
            React.$logRuntimeError(response)
        })
    }, []);

    return (
        <div className='main-content'>
            <SideBar />
            <div className='content-box'>
                <h2 className='content-header'>草稿箱</h2>
                {showEditBox ?
                    <MailEditBox
                        receivers={mailProps.receivers}
                        subject={mailProps.subject}
                        content={mailProps.content}
                        btnName={'返回'}
                        btnHandleClick={() => {
                            setShowEditBox(false);
                        }}
                    /> :
                    <div className='table-restrictor'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>主题</th>
                                    <th>收件人</th>
                                    <th>日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mails.map((value, index) => {
                                    return (
                                        <tr key={value.mailId}>
                                            <th>{value.subject}</th>
                                            <th>{value.receivers}</th>
                                            <th>{value.sendTime}</th>
                                            <th>
                                                <button className='btn btn-danger'>删除</button>
                                                <button className='btn btn-default' onClick={() => handleViewMail(index)}>查看</button>
                                            </th>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>}
                </div>
        </div>
    );
}