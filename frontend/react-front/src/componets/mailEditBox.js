import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import './mailEditBox.css';


export default function MailEditBox(props) {

    const [mailValues, setMailValues] = React.useState({
        receivers: '',
        subject: '',
        content: '',
    })

    const [btnControls, setBtnControls] = React.useState({
        loading: false,
        success: false,
        error: false,
    })

    const handleMailValuesChange = (e, target) => {
        let newValue = e.target.value;
        setMailValues({
            ...mailValues,
            [target]: newValue,
        });
        // console.log(newValue);
    }

    const handleSend = () => {

        let url = React.$getUrl('/sendmail');
        axios.post(url, {
            receivers: mailValues.receivers,
            subject: mailValues.subject,
            content: mailValues.content,
        }).then((response) => {
            console.log(response);
        }).catch((response) => {
            console.log(response)
        })

        if (!btnControls.loading) {
            setBtnControls({
                ...btnControls,
                success: false,
                loading: true,
            })
            window.setTimeout(() => {
                setBtnControls({
                    ...btnControls,
                    success: true,
                    loading: false,
                })
            }, 2000);
          }
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
                        sx={buttonSx}
                    >
                        {btnControls.success ? <CheckIcon /> : <SaveIcon />}
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
                <button className='btn btn-danger'>重置</button>
                <button className='btn btn-default'>保存</button>
                <button className='btn btn-info' onClick={handleSend}>发送</button>
            </div>
        </div>
    );

}