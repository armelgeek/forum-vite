import React, { useContext, useEffect } from 'react'
import sdk from "../../utils/api-sdk";
import { useParams,useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/Provider/AuthProvider';

const ConfirmationEmailChange = () => {
  const {id}:any = useParams();
  const history = useHistory();
  const {logout} = useContext(AuthContext);
  useEffect(()=>{
    try {
      let requestObj = sdk.confirmUpdateEmail(id).promise;
      requestObj
        .then((response: any) => {
          history.push('/');
          logout();
        })
        .catch((error:any) => {
          console.log(error.message);
          history.push('/');
        });
    } catch (error: any) {
      console.log("Une erreur s'est error.message");
      history.push('/');
    }
  },[])
  return null;
}
export default ConfirmationEmailChange;