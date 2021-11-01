import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import SideBar from '../componets/sideBar'
import './addressBook.css'

export default function AddressBook(props) {

    const [addressBook, setAddressBook] = useState([])

    const [btnControls, setBtnControls] = React.useState({
        loading: false,
        success: false,
        error: false,
    })


    const handleNameChange = (e, index) => {
        let newValue = e.target.value;
        let newAddressBook = addressBook.concat();
        newAddressBook[index].name = newValue;
        setAddressBook(newAddressBook)
    }

    const handleAddressChange = (e, index) => {
        let newValue = e.target.value;
        let newAddressBook = addressBook.concat();
        newAddressBook[index].address = newValue;
        setAddressBook(newAddressBook)
    }

    const handleSaveChange = (index) => {
        let newAddressBook = addressBook.concat();
        newAddressBook[index].isNew = false;
        newAddressBook[index].isUpdate = true;
        setAddressBook(newAddressBook)
    }

    const handleDelete = (index) => {
        let newAddressBook = addressBook.concat();
        let deleteItem = newAddressBook[index]
        newAddressBook.splice(index, 1)
        let url = React.$getUrl('/deleteAddress?addressId=' + deleteItem.addressId)
        axios.get(url).then((response) => {
            let responseBody = response.data;
            if (responseBody.status !== 0) {
                React.$logCommonError(responseBody);
            }
        }).catch((response) => {
            React.$logRuntimeError(response);
        })
        setAddressBook(newAddressBook)
    }

    const handleCreate = () => {
        let newAddressBook = addressBook.concat([{
            addressId: 0,
            name: '',
            address: '',
            isNew: true,
            isUpdate: false,
        }]);
        setAddressBook(newAddressBook);
    }

    const handleSend = () => {
        if (!btnControls.loading) {
            setBtnControls({
                error: false,
                success: false,
                loading: true,
            });
            let addressList = []
            addressBook.forEach((value) => {
                if (value.isUpdate) {
                    addressList.push({
                        name: value.name,
                        address: value.address
                    });
                }
            })
            let url = React.$getUrl('/insertAddress');
            axios.post(url, {
                addressList: addressList
            }).then((response) => {
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

    const buttonSx = {
        ...(btnControls.success && {
            cursor: 'default',
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
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

    return (
        <div className='main-content'>
            <SideBar />
            <div className='content-box'>
                <h2 className='content-header'>通讯录</h2>
                <div className='table-restrictor'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>地址</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addressBook.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{
                                            value.isNew ?
                                                <input type='text' value={value.name} onChange={(e) => handleNameChange(e, index)} /> :
                                                value.name
                                        }</th>
                                        <th>{
                                            value.isNew ?
                                                <input type='text' value={value.addreee} onChange={(e) => handleAddressChange(e, index)} /> :
                                                value.address
                                        }</th>
                                        <th>
                                            {value.isNew ?
                                                <button className={'btn btn-default'} onClick={() => handleSaveChange(index)}>确定</button> :
                                                <button className={'btn btn-danger'} onClick={() => handleDelete(index)}>删除</button>
                                            }

                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div>
                <div className='mail-controller'>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            sx={btnControls.error ? { cursor: 'default', bgcolor: '#d9534f' } : buttonSx}
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
                    <button className='btn btn-default' onClick={handleCreate}>新增</button>
                    <button className='btn btn-info' onClick={handleSend}>提交</button>
                </div>
            </div>
        </div>
    );

}