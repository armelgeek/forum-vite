import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetter, useDispatch } from '../../../store';
import UpdateSujet from './UpdateSujet';

const AdminEditTheme = () => {
    const { id }: any = useParams();
    const item = useGetter('sujet', 'selected', []);
    const getItem = useDispatch('sujet', 'get');
    useEffect(() => {
        getItem(
            {
                id: id,
            }, {
            error: "",
            success: "",
            path: '/api/sujet/'+ id
            }
        );
    }, [])
    console.log('item', item);
    return (
        <UpdateSujet item={item}/>
    )
}
export default AdminEditTheme;