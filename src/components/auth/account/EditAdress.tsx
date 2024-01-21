import React, { useEffect, useReducer, useState } from 'react'
import _ from 'lodash';
import { CitySelect, CountrySelect, GetCountries, GetLanguages, GetState, LanguageSelect, StateSelect } from '../../location';
import { storageDataPrefix } from '../../../config/constant';
import sdk from '../../../utils/api-sdk';
const actionTypes = {
  SET_COUNTRY: 'SET_COUNTRY',
  SET_STATE: 'SET_STATE',
  SET_ADDRESS: 'SET_ADDRESS',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_ERROR: 'SET_ERROR',
};
const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.SET_COUNTRY:
      return { ...state, country: action.payload, error: '', success: '' };
    case actionTypes.SET_STATE:
      return { ...state, state: action.payload, error: '', success: '' };
    case actionTypes.SET_ADDRESS:
      return { ...state, address: action.payload, error: '', success: '' };
    case actionTypes.SET_SUCCESS:
      return { ...state, success: action.payload, error: '' };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, success: '' };
    default:
      return state;
  }
};

export const EditAdress = ({ data }: any) => {

  const initialState = {
    country: data?.country || {},
    state: {},
    address: '',
    error: '',
    success: ''
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { country, state: selectedState, address, error, success } = state;
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountriesList(result);
    });
  }, []);
  const handleCountryChange = (selectedCountry: any) => {
    dispatch({ type: actionTypes.SET_COUNTRY, payload: selectedCountry });
  };

  const handleStateChange = (selectedState: any) => {
    dispatch({ type: actionTypes.SET_STATE, payload: selectedState });
  };

  const handleAddressChange = (e: any) => {
    dispatch({ type: actionTypes.SET_ADDRESS, payload: e.target.value });
  };

  const validateAndSubmit = () => {
    let isValid = true;

    if (!country.id) {
      dispatch({ type: actionTypes.SET_COUNTRY, payload: country });
      isValid = false;
    }

    if (!selectedState.id) {
      dispatch({ type: actionTypes.SET_STATE, payload: selectedState });
      isValid = false;
    }

    if (!address.trim()) {
      dispatch({ type: actionTypes.SET_ADDRESS, payload: address });
      isValid = false;
    }
    if (isValid) {
      try {
        const accessToken = localStorage.getItem(storageDataPrefix.accessToken) as string;
        let requestObj = sdk.updateAdressHandle({
          id: state.country.id,
          name: state.country.name,
          region: state.country.region
        }, {
          id: selectedState.id,
          name: selectedState.name,
          region: state.country.region
        }, address, accessToken).promise;
        requestObj
          .then((response: any) => {
            dispatch({ type: actionTypes.SET_SUCCESS, payload: response.message });
          })
          .catch((error: any) => {
            dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
          });
      } catch (error: any) {
         dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    } else {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Veuillez saisir les bonnes informations' });
    }
  };

  return (
    <>
      <div className="bg-white shadow flex flex-col gap-2 mb-5 w-full p-4">
      {success && <div className='alert alert-success'>{success}</div>}
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='w-full flex flex-row gap-2 items-center'>
          <div className="w-1/2">
            <h6>Pays</h6>
            <CountrySelect
              defaultValue={data?.country}
              onChange={(e) => {
                handleCountryChange(e);
              }}
              placeHolder="Selectionner un pays"
            />
          </div>
          <div className="w-1/2">
            <h6>Province</h6>
            <StateSelect
              countryid={country?.id}
              onChange={(e) => {
                handleStateChange(e);
              }}
              placeHolder="Selectionner une province"
            />
          </div>
        </div>
        <h6>Adresse</h6>
        <textarea className="textarea" onChange={handleAddressChange}>{state.address}</textarea>

        {/**<h6>Ville</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Selectionner une ville"
      />
      <h6>Language</h6>
      <LanguageSelect
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />**/}
      </div>
      <div className="flex flex-row justify-end">
        <button className="btn bg-primary-500 text-white" onClick={validateAndSubmit}>Enregistrer l'adresse</button>
      </div>
    </>
  )
}
