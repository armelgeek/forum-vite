import React, { useReducer, useState } from 'react';
import sdk from "../../utils/api-sdk";
import { MdOutlineWavingHand } from "react-icons/md";
import PasswordToggleTextInput from './PasswordToggleTextInput';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';


const ResetPassword = ({ state, dispatch, goBack, handleResetPassword }: any) => {
    const history =useHistory();
    const [codeError, setCodeError] = useState(false);
    const generatePassword = () => {
        handleResetPassword();
        dispatch({ type: 'prevStep' });
    }
    const handleNewPassword = () => {
        const { code, newPassword } = state;
        try {
            let requestObj = sdk.newPasswordHandle(state.email, code, newPassword).promise;
            requestObj.then((response: any) => {
                dispatch({ type: 'setSuccess', payload: response.message });
                
                setCodeError(false);
                history.push('/');
            }).catch((error) => {
                setCodeError(true);
                dispatch({ type: 'setSuccess', payload: error.message });
            });
        } catch (error: any) {
            setCodeError(true);
            dispatch({ type: 'setSuccess', payload: error.message });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mt-1 rounded-md bg-white border py-7 px-6 w-1/3">
                <div className="flex flex-col justify-center items-center">
                    <div className="icon-login mb-2">
                        <MdOutlineWavingHand className="text-primary-500" size={40} />
                    </div>
                    <h1 className="text-xl font-semibold text-center">Reinitialiser le mot de passe</h1>
                    <p className="text-gray-500 text-sm">Saisissez votre nouvelle mot de passe</p>
                    {state.errorMessage !== '' && <div className="alert alert-success mt-2 flex flex-row justify-center">{state.errorMessage}</div>}
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label htmlFor="username" className="text-gray-700 mt-2">Mot de passe</label>
                    <PasswordToggleTextInput
                        placeholder="Nouveau mot de passe"
                        secureTextEntry={true}
                        value={state.newPassword}
                        onChange={(e: any) => dispatch({ type: 'updateNewPassword', payload: e.target.value })}
                    />
                </div>
                <button onClick={handleNewPassword} disabled={!state.newPassword} className="btn flex flex-row text-white justify-center items-center w-full bg-primary-500 mt-2">Valider</button>

                {codeError && (
                    <div className="flex flex-row justify-center">
                        <div onClick={() => {
                            generatePassword();
                            goBack();
                        }} className="btn flex flex-row justify-center items-center  text-primary-500 hover:text-primary-600 text-sm"><FaRedo className="mr-2" /> Renvoyer le code  </div>
                    </div>
                )}
                <div className="text-sm mt-3 text-primary-500 flex flex-row justify-center items-center gap-2">
                    <FaArrowLeft />
                    <button onClick={goBack}>
                        Revenir en arriere
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ResetPassword;