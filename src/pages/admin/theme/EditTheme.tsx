import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetter, useDispatch } from '../../../store';
import UpdateTheme from './UpdateTheme';

const AdminEditTheme = () => {
    const { id }: any = useParams();
    const item = useGetter('theme', 'selected', []);
    const getItem = useDispatch('theme', 'get');
    useEffect(() => {
        getItem(
            {
                id: id,
            }, {
            error: "",
            success: "",
            path: '/api/theme/'+ id
            }
        );
    }, [])
    console.log('item', item);
    return (
        <UpdateTheme item={item}/>
    )
}
export default AdminEditTheme;