import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useGetter } from '../../../store';
import Page from '../../../components/admin/Page';
import Links from '../../../components/admin/Links';
import ActiveLink from '../../../components/admin/ActiveLink';

const AdminDetailTheme = () => {
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
            path: '/api/theme/' + id
        }
        );
    }, [])
    return (
        <Page>
            <Links title={"Detail d'un theme"} description={""}>
                <ActiveLink title={"Detail d'un theme » " + item.name}></ActiveLink>
            </Links>

            <div className="w-1/2 my-3 rounded-primary border border-slate-300 bg-white p-4 shadow dark:border-slate-600 dark:bg-slate-800">
                <div className="w-full">
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Id</td>
                                <td>{item.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{item.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{item.description}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Page>
    )
}
export default AdminDetailTheme;