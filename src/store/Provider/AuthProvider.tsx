import React, {
    createContext,
    useCallback,
    useEffect,
    useReducer,
  } from "react";
  import jwtDecode from "jwt-decode";
  import { storageDataPrefix } from "../../config/constant";
  import _ from "lodash";
  import auth from "../../utils/api-sdk/modules/auth";
  interface User {
    id?: string | null;
    email?: string | null;
    username?: string | null;
    photo?: string | null;
    slug?: string | null;
  }
  
  interface AuthState {
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any | null;
    message: string | null;
    isVerified: boolean;
    code: number;
    email: string;
    password: string;
    blockedUntil: any | undefined;
  }
  
  interface LoginSuccessAction {
    type: "LOGIN_SUCCESS";
    payload: {
      accessToken: string;
      refreshToken: string;
      isAuthenticated: true;
      user: User;
    };
  }
  
  interface LoginFailAction {
    type: "LOGIN_FAIL";
    payload: string;
  }
  
  interface SetUserAction {
    type: "SET_USER";
    payload: User;
  }
  
  interface SetLoadingAction {
    type: "SET_LOADING";
  }
  
  type RefreshTokenAction = {
    type: "REFRESH_TOKEN";
    payload: any;
  };
  type SetErrorAction = {
    type: "SET_MESSAGE";
    payload: string;
  };
  
  interface LogoutAction {
    type: "LOGOUT";
  }
  interface SetImageProfilAction {
    type: "SET_IMAGE_PROFIL";
    payload: any;
  }
  interface SetCheckVerifiedAccount {
    type: "CHECK_VERIFIED_ACCOUNT";
  }
  interface SetCodeAction {
    type: "UPDATE_CODE";
    payload: number;
  }
  interface SetEmailAction {
    type: "SET_EMAIL";
    payload: string;
  }
  interface SetPasswordAction {
    type: "SET_PASSWORD";
    payload: string;
  }
  interface SetTokenAction {
    type: "SET_TOKEN";
    payload: string;
  }
  type AuthAction =
    | LoginSuccessAction
    | LoginFailAction
    | SetUserAction
    | SetLoadingAction
    | RefreshTokenAction
    | LogoutAction
    | SetImageProfilAction
    | SetErrorAction
    | SetCodeAction
    | SetEmailAction
    | SetPasswordAction
    | SetCheckVerifiedAccount
    | SetTokenAction;
  
  const initialState: AuthState = {
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
    message: null,
    isVerified: true,
    code: 1234,
    email: "",
    password: "",
    blockedUntil: null,
  };
  
  const tokenExpired = (token: string): boolean => {
    //console.log('tokenExpired', token);
    if (token !== '') {
      const expiry = jwtDecode<{
        exp: number
      }>(token).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } else {
      return false;
    }
  }
  
  const AuthContext = createContext<{
    state: AuthState;
    dispatch: any;
    login: (
      email: string,
      password: string,
      toggleCodeActivation: any,
      blockedCallbacks: any
    ) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    setUser: (payload: any) => void;
    setImageProfil: (payload: any) => void;
  }>({
    state: initialState,
    dispatch: () => { },
    login: async (email: string,
      password: string,
      toggleCodeActivation: any, blockedCallbacks: any) => { },
    logout: () => { },
    checkAuth: () => { },
    setUser: () => { },
    setImageProfil: () => { },
  });
  
  const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "LOGIN_SUCCESS": {
        // console.log('storage date prefix',action.payload);
        localStorage.setItem(
          storageDataPrefix.accessToken,
          action.payload.accessToken
        );
        if (action.payload.refreshToken) {
          localStorage.setItem(
            storageDataPrefix.refreshToken,
            action.payload.refreshToken
          );
        }
      }
        //console.log('arrive ici');
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.user,
          token: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      case "CHECK_VERIFIED_ACCOUNT":
        return {
          ...state,
          isAuthenticated: false,
          isVerified: false,
          isLoading: false,
          user: null,
          token: null,
        };
      case "SET_IMAGE_PROFIL":
        return {
          ...state,
          user: {
            ...state.user,
            photo: action.payload,
          },
          isLoading: false,
        };
      case "LOGIN_FAIL":
        localStorage.removeItem(storageDataPrefix.accessToken);
        localStorage.removeItem(storageDataPrefix.refreshToken);
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          message: action.payload,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          isLoading: false,
        };
  
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };
      case "SET_EMAIL":
        return {
          ...state,
          email: action.payload,
        };
  
      case "SET_MESSAGE":
        return {
          ...state,
          message: action.payload,
        };
      case "UPDATE_CODE":
        return {
          ...state,
          code: action.payload,
        };
      case "SET_TOKEN":
        return {
          ...state,
          token: action.payload,
        };
      case "SET_PASSWORD":
        return {
          ...state,
          password: action.payload,
        };
      case "LOGOUT":
        localStorage.removeItem(storageDataPrefix.accessToken);
        localStorage.removeItem(storageDataPrefix.refreshToken);
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          user: null,
          token: null,
          message: null,
        };
  
      default:
        return state;
    }
  };
  
  const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const user: any = {
      id: "",
      email: "",
      username: "",
      photo: "",
      slug: ""
    };
    const login = async (
      email: string,
      password: string,
      toggleCodeActivation: any,
      blockedCallbacks: any
    ) => {
  
      try {
        dispatch({ type: "SET_LOADING" });
  
        let requestObj = auth.loginAuth(email, password).promise;
  
        const data = await requestObj
          .then((response: any) => {
            console.log('response', response);
            const { accessToken, refreshToken, isVerified, isBlocked } = response;
  
            if (!isVerified) {
              toggleCodeActivation();
              return;
            }
  
  
            const decodedToken = jwtDecode(accessToken) as any;
            if (decodedToken != null) {
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                  accessToken,
                  refreshToken,
                  isAuthenticated: true,
                  user: {
                    id: decodedToken.id as string,
                    email: decodedToken.email as string,
                    username: decodedToken.username as string,
                    photo: decodedToken.photo as string,
                    slug: decodedToken.slug as string
                  },
                },
              });
            }
          })
          .catch((error: any) => {
            console.log("error", error);
            if (error.statusCode == 409) {
              dispatch({ type: "CHECK_VERIFIED_ACCOUNT" });
            }
            if (error.statusCode == 401) {
              if (error.isBlocked) {
                blockedCallbacks();
              }
  
            }
            dispatch({ type: "SET_MESSAGE", payload: error.message });
          });
      } catch (error: any) {
        console.log("error", error);
        if (error.statusCode == 409) {
          dispatch({ type: "CHECK_VERIFIED_ACCOUNT" });
        }
        if (error.statusCode == 401) {
          if (error.isBlocked) {
            blockedCallbacks();
          }
        }
        dispatch({ type: "SET_MESSAGE", payload: error.message });
      }
    };
    const logout = () => {
      dispatch({ type: "LOGOUT" });
    };
    const setUser = (payload: any) => {
      dispatch({ type: "SET_USER", payload: payload });
    };
    const setImageProfil = (url: string) => {
      dispatch({ type: "SET_IMAGE_PROFIL", payload: url });
    };
    const checkAuth = async () => {
      const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
      //console.log("check access token", accessToken);
      const refreshToken = localStorage.getItem(storageDataPrefix.refreshToken) as string;
      //console.log("check refresh token", refreshToken);
      if (!_.isUndefined(accessToken) && !_.isNull(accessToken)) {
  
        // @ts-ignore
        if (tokenExpired(accessToken)) {
          //console.log("not connected,but expire token",refreshToken);
          const newAccessToken = auth.refreshTokenAuth(refreshToken).promise;
          await newAccessToken
            .then(async (response: any) => {
              //console.log('refreshtoken',response);
              if (response === undefined) return;
              const { accessToken } = response;
              localStorage.setItem(storageDataPrefix.accessToken, accessToken);
              const meInfo = auth.getMeInfo(accessToken).promise;
              await meInfo
                .then((user: any) => {
                  // @ts-ignore
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                      accessToken: accessToken,
                      refreshToken,
                      isAuthenticated: true,
                      user: user,
                    },
                  });
                })
                .catch((error:any) => {
                  dispatch({ type: "SET_MESSAGE", payload: error.message });
                  return;
                });
            })
            .catch((error:any) => {
              //console.log(error);
              // throw new Error("mela leka failed");
            });
        } else {
          //console.log("continue token not expire");
          // @ts-ignore
          const meInfo = auth.getMeInfo(accessToken).promise;
  
          await meInfo
            .then((response: any) => {
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                  accessToken: accessToken,
                  refreshToken,
                  isAuthenticated: true,
                  user: response,
                },
              });
            })
            .catch((error:any) => {
              //console.log(error);
              dispatch({ type: "SET_MESSAGE", payload: error.message });
              return;
            });
        }
      }
    }
    useEffect(() => {
      checkAuth().then(r => { });
  
      // Appel de checkAuth toutes les 5 minutes (300 000 millisecondes)
      const interval = setInterval(() => {
        checkAuth().then(r => { });
      }, 300000);
      return () => clearInterval(interval);
    }, []);
    return (
      <AuthContext.Provider
        value={{
          state,
          dispatch,
          login,
          logout,
          checkAuth,
          setUser,
          setImageProfil,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthProvider, AuthContext };