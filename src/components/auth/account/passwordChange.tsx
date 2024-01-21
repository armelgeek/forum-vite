import React, { useReducer } from 'react'
import PasswordToggleTextInput from '../PasswordToggleTextInput'
import sdk from "../../../utils/api-sdk";
import { storageDataPrefix } from '../../../config/constant';
const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: '',
    message: ''
};
const passwordChangeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'RESET_INPUT':
            return {
                ...state,
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                error: '',
            }
        case "CHANGE_PASSWORD":
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

const PasswordChangeForm = () => {
    const [state, dispatch] = useReducer(passwordChangeReducer, {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: '',
        message: ''
    });

    const handleChange = (field: any, value: any) => {
        dispatch({
            type: "CHANGE_PASSWORD",
            payload: {
                field,
                value,
            },
        });
    };
    const setError = (message: string) => {
        dispatch({
            type: "SET_ERROR",
            payload: message,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (state.oldPassword && state.newPassword && state.confirmPassword) {
            try {
                const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
                let requestObj = sdk.updatePasswordHandle(state.oldPassword, state.newPassword, state.confirmPassword, accessToken).promise;
                requestObj
                    .then((response: any) => {
                        dispatch({ type: "SET_MESSAGE", payload: response.message });
                        setError("");
                        dispatch({ type: "RESET_INPUT" });
                    })
                    .catch((error) => {
                        dispatch({ type: "SET_MESSAGE", payload: "" });
                        setError(error.message);
                    });
            } catch (error: any) {
                setError(error.message);
                dispatch({ type: "SET_MESSAGE", payload: "" });
            }
        } else {
            setError('Veuillez remplir tous les champs.');
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            {state.error && <div className="alert alert-danger my-2">{state.error}</div>}
            {state.message && <div className="alert alert-success my-2">{state.message}</div>}
            <div className="bg-white shadow flex flex-row gap-5 w-full p-4 justify-between items-center pb-2">
                <PasswordToggleTextInput
                    placeholder={"Ancien mot de passe"}
                    value={state.oldPassword}
                    onChange={(e: any) => handleChange('oldPassword', e.target.value)}
                />
                <PasswordToggleTextInput
                    placeholder={"Nouveau mot de passe"}
                    value={state.newPassword}
                    onChange={(e: any) => handleChange('newPassword', e.target.value)}
                />
                <PasswordToggleTextInput
                    placeholder={"Confirmer le mot de passe"}
                    value={state.confirmPassword}
                    onChange={(e: any) => handleChange('confirmPassword', e.target.value)}
                />
            </div>
            <div className="submit flex flex-row justify-end py-2">
                <button type="submit" className='btn bg-primary-500 text-white'>Modifier mon mot de passe</button>
            </div>
        </form>

    )
}
export default PasswordChangeForm;