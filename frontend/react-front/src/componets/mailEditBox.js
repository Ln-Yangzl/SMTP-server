import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import './mailEditBox.css';


export default function MailEditBox(props) {

    const [mailValues, setMailValues] = React.useState({
        receivers: props.receivers || '',
        subject: props.subject || '',
        content: props.content || '',
    })

    const [btnControls, setBtnControls] = React.useState({
        loading: false,
        success: false,
        error: false,
    })

    const [addressBook, setAddressBook] = React.useState([])

    React.useEffect(() => {
        let url = React.$getUrl('/getAddressBook');
        axios.get(url).then((response) => {
            let responseBody = response.data
            if (responseBody.status === 0) {
                setAddressBook(responseBody.data)
            } else {
                React.$logCommonError(responseBody);
            }
        }).catch((response) => {
            React.$logRuntimeError(response)
        })
    }, [])

    const handleMailValuesChange = (e, target) => {
        let newValue = e.target.value;
        setMailValues({
            ...mailValues,
            [target]: newValue,
        });
        // console.log(newValue);
    }

    const handleAddFromAddressBook = (value) => {
        let address = '';
        if (mailValues.receivers.length === 0) {
            address = value;
        } else {
            address = ';' + value;
        }
        setMailValues({
            ...mailValues,
            receivers: mailValues.receivers + address,
        });
    }

    const handleSend = () => {

        if (!btnControls.loading) {
            setBtnControls({
                error: false,
                success: false,
                loading: true,
            })
            let url = React.$getUrl('/sendmail');
            axios.post(url, {
                receivers: mailValues.receivers,
                subject: mailValues.subject,
                content: mailValues.content,
            }).then((response) => {
                // console.log(response);
                let responseBody = response.data;
                if (responseBody.status === 0) {
                    setBtnControls({
                        error: false,
                        success: true,
                        loading: false,
                    })
                } else {
                    React.$logCommonError(responseBody)
                    setBtnControls({
                        error: true,
                        success: false,
                        loading: false,
                    })
                }
                
            }).catch((response) => {
                React.$logRuntimeError(response)
                setBtnControls({
                    error: true,
                    success: false,
                    loading: false,
                })
            })
        }
    }

    const handleSave = () => {
        if (!btnControls.loading) {
            setBtnControls({
                error: false,
                success: false,
                loading: true,
            });
            let url = React.$getUrl('/saveDraft')
            axios.post(url, {
                receivers: mailValues.receivers,
                subject: mailValues.subject,
                content: mailValues.content,
            }).then((response) => {
                // console.log(response);
                let responseBody = response.data;
                if (responseBody.status === 0) {
                    setBtnControls({
                        ...btnControls,
                        success: true,
                        loading: false,
                    })
                } else {
                    React.$logCommonError(responseBody)
                    setBtnControls({
                        error: true,
                        success: false,
                        loading: false,
                    })
                }
                
            }).catch((response) => {
                React.$logRuntimeError(response)
                setBtnControls({
                    error: true,
                    success: false,
                    loading: false,
                })
            })
        }
    }

    const handleClear = () => {
        setMailValues({
            ...mailValues,
            content: ''
        })
    }

    const buttonSx = {
        ...(btnControls.success && {
            cursor: 'default',
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    return (
        <div className='mail-edit-box'>
            <ul className='mail-items'>
                <li className='item'>
                    <span>收件人</span>
                    <input type='text' value={mailValues.receivers} onChange={(e) => handleMailValuesChange(e, 'receivers')} />
                </li>
                <li className='info-item'>
                    <span>
                        可输入多个收件人，以分号分隔
                    </span>| 
                    <span className='outbox'>
                        从通讯录添加
                        <div className='fill-box'></div>
                        <ul>
                            <div className='triangle-up'></div>
                            {addressBook.map((value, index) => {
                                return (
                                    <li key={index} onClick={() => handleAddFromAddressBook(value.address)}>
                                        {value.name + ' ' + value.address}
                                    </li>
                                );
                            })}
                        </ul>
                    </span>
                </li>
                <li className='item'>
                    <span>主题</span>
                    <input type='text' value={mailValues.subject} onChange={(e) => handleMailValuesChange(e, 'subject')} />
                </li>
                <li className='item text-content'>
                    <span>正文</span>
                    <textarea value={mailValues.content} onChange={(e) => handleMailValuesChange(e, 'content')} />
                </li>
            </ul>
            <div className='mail-controller'>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={btnControls.error ? {cursor: 'default', bgcolor: '#d9534f'} : buttonSx}
                    >
                        {btnControls.error ? <WarningOutlinedIcon /> : (btnControls.success ? <CheckIcon /> : <SaveIcon />)}
                    </Fab>
                    {btnControls.loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                                cursor: 'default',
                            }}
                        />
                    )}
                </Box>
                <button className='btn btn-danger' onClick={handleClear}>重置</button>
                <button className='btn btn-default' onClick={props.btnHandleClick || handleSave}>{props.btnName || '保存'}</button>
                <button className='btn btn-info' onClick={handleSend}>发送</button>
            </div>
        </div>
    );

}