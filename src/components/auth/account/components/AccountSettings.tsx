import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import sdk from "../../../../utils/api-sdk";
import { storageDataPrefix } from '../../../../config/constant';

const initialState = {
    isLoading: false,
    error: null,
    message: null,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'UPDATE_START':
            return { ...state, isLoading: true, error: null, message: null };
        case 'UPDATE_SUCCESS':
            return { ...state, isLoading: false, error: null, message: action.payload };
        case 'UPDATE_FAILURE':
            return { ...state, isLoading: false, error: action.payload, message: null };
        case 'SET_MESSAGE':
            return {
                ...state,
                isLoading: false,
                error: null,
                message: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};


const AccountSettings = ({ name, email }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [formData, setFormData] = useState({
        name: name || '',
        email: email || ''
    });
    useEffect(() => {
        setFormData({
            name: name,
            email: email
        });
    }, [name, email]);
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidName = (name: string) => {
        return name.length >= 3;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!isValidEmail(formData.email) || !isValidName(formData.name)) {
            dispatch({
                type: 'UPDATE_FAILURE',
                payload: 'Veuillez fournir des données valides.',
            });
            return;
        }
        dispatch({ type: 'UPDATE_START' });
        try {
            const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
            let requestObj = sdk.updateProfileHandle(formData.name, formData.email, accessToken).promise;
            requestObj
                .then((response: any) => {
                    console.log('updateProfile', response);
                    dispatch({ type: "SET_MESSAGE", payload: response.message });
                })
                .catch((error: any) => {
                    dispatch({ type: "SET_MESSAGE", payload: error.message });
                });
        } catch (error: any) {
            dispatch({ type: "SET_MESSAGE", payload: error.message });
        }
    };

    return (
        <div>
            {state.message && <div className="alert alert-success  mb-1">{state.message}</div>}
            {state.error && <div className="alert alert-danger mb-1"> {state.error}</div>}
            <form onSubmit={handleSubmit}>

                <div className="bg-white shadow flex flex-row gap-5 w-full py-3 pl-3">
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            placeholder={"Adresse e-mail"}
                            className='text-sm  h-10 w-80  items-center overflow-hidden rounded-primary bg-slate-100 dark:text-white text-slate-600 dark:bg-slate-800 sm:flex'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Nom d'utilisateur</label>
                        <input
                            name="name"
                            placeholder={"Nom d'utilisateur"}
                            className='text-sm  h-10 w-80  items-center overflow-hidden rounded-primary bg-slate-100 dark:text-white text-slate-600 dark:bg-slate-800 sm:flex'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>


                </div>
                <div className="submit flex flex-row justify-end py-2">
                    <button type="submit" className='btn bg-primary-500 text-white'>Modifier le profil</button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;
