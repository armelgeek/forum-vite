import { useContext, useEffect, useReducer } from "react";
import sdk from "../../../utils/api-sdk";
import PasswordToggleTextInput from "../PasswordToggleTextInput";
import { storageDataPrefix } from "../../../config/constant";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../store/Provider/AuthProvider";
const accountDeleteReducer = (state: any, action: any) => {
    switch (action.type) {
        case "DELETE_ACCOUNT":
            return {
                ...state,
                password: action.payload,
                deleteError: '',
                deleteApiMessage: '',
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload,
            };
        case "CLEAR_DELETE_FORM":
            return {
                password: '',
                error: ''
            };
        default:
            return state;
    }
};


const AccountDeleteForm = ({ visible, setVisible }: any) => {
    const history = useHistory();
    const { logout } = useContext(AuthContext);
    const [state, dispatch] = useReducer(accountDeleteReducer, {
        password: '',
        error: '',
        message: ''
    });

    const handleChange = (value: any) => {
        dispatch({
            type: "DELETE_ACCOUNT",
            payload: value,
        });
    };

    const setDeleteError = (message: string) => {
        dispatch({
            type: "SET_ERROR",
            payload: message,
        });
    };

    const setDeleteApiMessage = (message: string) => {
        dispatch({
            type: "SET_MESSAGE",
            payload: message,
        });
    };
    const clearForm = () => {
        dispatch({
            type: "CLEAR_DELETE_FORM",
        });
    };

    const handleDelete = (e: any) => {
        e.preventDefault();
        if (!state.password) {
            setDeleteError('Veuillez entrer votre mot de passe.');
            return;
        }
        try {
            const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
            let requestObj = sdk.deleteAccountHandle(state.password, accessToken).promise;
            requestObj
                .then((response: any) => {
                    dispatch({ type: "SET_MESSAGE", payload: response.message });
                    setDeleteApiMessage('Compte supprimé avec succès!');
                    clearForm();
                    setVisible(false);
                    logout();
                    history.push('/');
                })
                .catch((error:any) => {
                    dispatch({ type: "SET_MESSAGE", payload: "" });
                    setDeleteError(error.message);
                    setVisible(false);
                });
        } catch (error: any) {
            setDeleteError('Erreur lors de la suppression du compte.');
            dispatch({ type: "SET_MESSAGE", payload: "" });
            setVisible(false);
        }

    };
    useEffect(() => {
        dispatch({ type: "SET_ERROR", payload: "" })
    }, [visible])

    return (
        <form onSubmit={handleDelete}>

            <div className='flex flex-col gap-2'>
                <p>
                    Vous êtes sur le point de supprimer votre compte Tiakalo, pour le faire entrez votre mot de passe. La suppression de votre compte est immédiate et irréversible.
                </p>
                {state.error && <div className="alert alert-danger my-2">{state.error}</div>}
                {state.message && <div className="alert alert-success my-2">{state.message}</div>}
                <div className="relative w-full flex flex-col gap-2">
                    <PasswordToggleTextInput
                        placeholder="Entrer votre mot de passe pour confirmer"
                        className="text-sm h-10 w-full border items-center overflow-hidden rounded-primary bg-slate-100 dark:text-white text-slate-600 dark:bg-slate-800 sm:flex"
                        value={state.password}
                        onChange={(e: any) => handleChange(e.target.value)}
                    />
                    <div className="error-message">{state.deleteError}</div>
                    <div className="api-message">{state.deleteApiMessage}</div>
                    <button className='btn text-white bg-red-500' type="submit">
                        Confirmer la suppression
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AccountDeleteForm;