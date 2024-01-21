import React, { useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from '../../../store/Provider/AuthProvider';
import sdk from "../../../utils/api-sdk";
import { storageDataPrefix } from '../../../config/constant';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { CgMail } from 'react-icons/cg';
import { BiTime } from 'react-icons/bi';
import { formatRelativeDate } from '../../../utils/functions';
const imageMimeType = /image\/(png|jpg|jpeg)/i;
interface State {
    isLoading: boolean;
    user: any | null;
    error: string | null;
}

type Action =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: any }
    | { type: "FETCH_FAILURE"; payload: string };

const initialState: State = {
    isLoading: false,
    user: null,
    error: null,
};
const reducer = (state: State, action: any): State => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, isLoading: true, error: null };
        case "FETCH_SUCCESS":
            return { ...state, isLoading: false, user: action.payload, error: null };
        case "FETCH_FAILURE":
            return { ...state, isLoading: false, user: null, error: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
const BannerAccount = ({ children }: any) => {
    const [stateEvt, dispatchEvt] = useReducer(reducer, initialState);

    const [file, setFile] = useState(null);
    const { state, checkAuth, setImageProfil,setUser }:any = useContext(AuthContext);
    const [showElement, setShowElement] = useState(false);
    const [fileDataURL, setFileDataURL] = useState("");
    const changeHandler = (e: any) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            console.log("Image mime type is not valid");
            return;
        }

        (async () => {
            await promiseAwait().then(async () => {
                const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
                const reqPromise = sdk.updateAvatar(file, accessToken).promise;
                reqPromise.then(({ body }: any) => {
                    setImageProfil(body.photoUrl);
                })
                    .catch((err:any) => console.log("une erreur s'est produite "));
            });
        })();
        setFile(file);
    }
    const updateProfile = async ({ username, email }: any) => {
        console.log('user update profile',username,email);
        setUser({ ...state.user, username: username, email: email });
    }
    useEffect(() => {
        let fileReader: any, isCancel: boolean = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)

                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);
    const promiseAwait = async () => {
        await checkAuth();
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 270) {
                setShowElement(true);
            } else {
                setShowElement(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            dispatchEvt({ type: "FETCH_START" });
            try {
                const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
                let requestObj = sdk.getMeInfoHandle(accessToken).promise;
                const data = requestObj
                    .then((response: any) => {
                        console.log('response leka',response);
                        if ("message" in response) {
                            throw new Error(response.message);
                        }
                        dispatchEvt({ type: "FETCH_SUCCESS", payload: response });
                        setFileDataURL(response.photo)
                    })
                    .catch((error:any) => {
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
   
    return (
        <div className='pb-32'>
            {showElement && (
                <div className="fixed animate-fade-in-down  duration-700 top-14 left-0 w-full  z-30">
                    <div className='mx-44 max-[828px]:mx-20 max-[711px]:mx-10 max-[675px]:mx-20 max-[591px]:mx-16 max-[528px]:mx-4  max-[474px]:pb-10'>
                        <div className="w-full mr-5 shadow border bg-white">
                            <div className="flex flex-row justify-between  items-center gap-6 px-8 h-14">
                                <div className="flex flex-row gap-2">
                                    <div className="img">
                                        <img src={`${fileDataURL}`} alt="avatar-img" id="user-image" className="h-14 w-14 border-4 border-white   rounded-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className='text-lg font-semibold pb-0 h-6 capitalize'>{state.user?.username}</h3>
                                        <p className='text-sm text-slate-500 line my-0 py-0'>@{state.user?.slug}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Link to={"/songs/create"} className='flex flex-row gap-1 text-sm btn btn-default bg-primary-200  border btn-xs rounded-2xl px-3 text-primary-500'><HiPlus /> Ajouter une musique</Link>
                                    <Link to={"/profile/edit"} className='flex flex-row gap-1 text-sm btn btn-primary btn-xs rounded-2xl px-3'><FiEdit2 /> Modifier le profil</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <div className=" w-full my-5">
                <div className=" sticky bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 px-4 w-full flex flex-row gap-2 items-end shadow h-40">
                    <div className="w-full flex flex-row ">
                        <div className="my-2 absolute left-8 -bottom-20">
                            <img src={`${fileDataURL}`} alt="avatar-img" id="user-image" className="h-24 w-24 border-4 border-white   rounded-full" />
                            <label htmlFor="upload-avatar" className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-50 p-2 dark:bg-slate-900">
                                <span className="text-slate-600 dark:text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-camera w-full"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                </span>
                                <input type="file" onChange={changeHandler} accept="image/jpeg, image/png, image/jpg" className="hidden" id="upload-avatar" />
                            </label>
                        </div>
                        <div className="flex flex-row justify-between items-end w-full">
                        </div>
                    </div>
                </div>
                <div className="w-full mr-5 shadow bg-white">
                    <div className="flex flex-row justify-between  items-center gap-6 pl-36 pr-8 h-14">
                        <div className="flex flex-col">
                            <h3 className='text-lg font-semibold pb-0 h-6 text-primary-500 capitalize'>{state.user?.username}</h3>
                            <p className='text-sm text-slate-500 line my-0 py-0'>@{state.user?.slug}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Link to={"/songs/create"} className='flex flex-row gap-1 text-sm btn btn-default bg-primary-200  border btn-xs rounded-2xl px-3 text-primary-500'><HiPlus /> Ajouter une musique</Link>
                            <Link to={"/profile/edit"} className='flex flex-row gap-1 text-sm btn btn-primary btn-xs rounded-2xl px-3'><FiEdit2 /> Modifier le profil</Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-row-reverse gap-6  justify-between">
                <div className="w-102 h-full sticky   top-32">
                    <div className="w-full bg-slate-100 border p-2 h-32">
                        <h3 className="uppercase text-sm  text-primary-500 font-bold">Information génerale</h3>
                        <div className="my-1 px-2">
                            <ul className="mt-1 text-left ">
                                <li className="text-slate-500 my-1 text-sm"><CgMail className="mr-1 text-primary-500" /> {state.user?.email}</li>
                                <li className="text-slate-500 my-1  text-sm"><BiTime className="mr-1 text-primary-500" /> {formatRelativeDate(state.user?.created_at, 'Inscrit depuis')}</li>
                            </ul>
                        </div>

                    </div>
                    
                </div>
                <div className="w-full">
                    {children}
                </div>


            </div>
        </div>
    )
}
export default BannerAccount;
