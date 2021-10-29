import React from 'react'
import axios from 'axios'
import SideBar from '../componets/sideBar'
import MailEditBox from '../componets/mailEditBox';


export default function SendedBox(props) {

    const data = [
        {
            mailId: 1,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 2,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 3,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 4,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 5,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 6,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 7,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
        {
            mailId: 8,
            subject: 'asdfa',
            receivers: '565213263@qq.com;979710450@qq.com',
            date: '2021-10-29 09:03:24',
        },
    ]

    return (
        <div className='main-content'>
            <SideBar />
            <div className='content-box'>
                <h2 className='content-header'>发件箱</h2>
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
                            {data.map((value) => {
                                return (
                                    <tr>
                                        <th>{value.subject}</th>
                                        <th>{value.receivers}</th>
                                        <th>{value.date}</th>
                                        <th><btn className='btn btn-default'>查看</btn></th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}