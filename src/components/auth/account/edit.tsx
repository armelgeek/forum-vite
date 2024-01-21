import React, { useContext, useEffect, useReducer, useState } from 'react'
import BannerAccount from './banner'
import { FaArrowLeft, FaLock, FaTrash, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../store/Provider/AuthProvider';
import sdk from "../../../utils/api-sdk";
import { storageDataPrefix } from '../../../config/constant';
import AccountSettings from './components/AccountSettings';
import { IoMdClose } from 'react-icons/io';
import PasswordChangeForm from './passwordChange';
import AccountDeleteForm from './accountDelete';
import { EditAdress } from './EditAdress';
import { FaCity } from 'react-icons/fa6';
const initialState = {
    isLoading: false,
    user: null,
    error: null,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, user: action.payload, error: null };
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, user: null, error: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
const tokenExpired = (token: any) => {
    if (token !== '') {
        console.log('t',JSON.parse(atob(token.split('.')[1])));
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    } else {
        return false;
    }
}
const EditProfile = () => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const goBack = () => history.goBack();
    const [stateEvt, dispatchEvt] = useReducer(reducer, initialState);
    const { state, dispatch } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            dispatchEvt({ type: "FETCH_START" });
            try {
                const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
                let requestObj = sdk.getMeInfoHandle(accessToken).promise;
                const data = requestObj
                    .then((response: any) => {
                        if ("message" in response) {
                            throw new Error(response.message);
                        }
                        dispatchEvt({ type: "FETCH_SUCCESS", payload: response });

                    })
                    .catch((error: any) => {
                        console.log(error);
                        throw new Error("failed");
                    });
            } catch (error: any) {
                console.log(error);
                dispatchEvt({ type: "FETCH_FAILURE", payload: error.message });
            }
        };

        fetchData();
    }, [state]);
    console.log('stateEvt',stateEvt);
    return (
        <>
            <div className="container relative">
                <div className="text-sm my-3 text-primary-500 flex flex-row items-center gap-2">
                    <FaArrowLeft />
                    <button onClick={goBack}>
                        Revenir en arriere
                    </button>
                </div>
                <BannerAccount>
                    <div className=" mx-3 pt-5">
                        <div className="flex flex-row justify-between items-center pb-2">
                            <div className="title flex gap-1 flex-row  items-center ">
                                <FaUser className="font-bold text-primary-500" />
                                <h2 className="font-bold text-base text-primary-500 uppercase"> Mes informations</h2>
                            </div>
                        </div>
                        <AccountSettings name={stateEvt.user?.username} email={stateEvt.user?.email} />
                        

                        <div className="flex flex-row justify-between items-center pb-2">
                            <div className="title flex gap-1 flex-row  items-center ">
                                <FaCity className="font-bold text-primary-500" />
                                <h2 className="font-bold text-base text-primary-500 uppercase">Adresse</h2>
                            </div>
                        </div>
                        <EditAdress data={stateEvt.user}/>
                        <div className="flex flex-row justify-between items-center pb-2">
                            <div className="title flex gap-1 flex-row  items-center ">
                                <FaLock className="font-bold text-primary-500" />
                                <h2 className="font-bold text-base text-primary-500 uppercase"> Mot de passe</h2>
                            </div>
                        </div>
                        <PasswordChangeForm />
                        <div className="flex flex-row justify-between items-center pb-2">
                            <div className="title flex gap-1 flex-row  items-center ">
                                <FaTrash className="font-bold text-red-500" />
                                <h2 className="font-bold text-base text-red-500 uppercase"> Danger Zone</h2>
                            </div>
                        </div>
                        <div className="alert alert-danger justify-start items-start flex flex-col">
                            <h3 className='text-red-500'>Vous n'êtes pas satisfait du contenu du site ?</h3>
                            <p className='text-red-500'>Ou vous souhaitez supprimer toutes les informations associées à ce compte ?</p>
                        </div>
                        <div className="submit flex flex-row justify-end py-2">
                            <button onClick={() => setVisible(true)} className='btn bg-red-500 text-white flex flex-row gap-2'><FaTrash className="font-bold text-white" />Supprimer mon compte</button>
                        </div>
                    </div>
                </BannerAccount>
                <div className={`modal modal-sm modal-centered ${visible ? 'show' : ''}`} style={{
                    display: visible ? 'flex' : 'none'
                }}>
                    <div className="modal-dialog">

                        <div className="modal-content ">
                            <div className="modal-header">
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <h3 className='text-red-500'>Confirmer la suppression</h3>
                                    </div>
                                    <div className="icon cursor-pointer" onClick={() => setVisible(!visible)}>
                                        <IoMdClose />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body  px-3">
                                <AccountDeleteForm visible={visible} setVisible={setVisible} />
                            </div>
                        </div>
                    </div>
                    <div className={`modal-backdrop ${visible ? 'show' : ''}`} onClick={() => setVisible(!visible)}></div>
                </div>
            </div>
        </>
    )
}
export default EditProfile;