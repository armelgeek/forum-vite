import React, { HTMLProps, useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'


import {
    Column,
    Table,
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    SortingState,
    ColumnDef,
    flexRender,
    PaginationState,

} from '@tanstack/react-table'
import { faker } from '@faker-js/faker'
import { BsChevronDoubleRight, BsPencilFill } from 'react-icons/bs'
import { CgChevronDoubleLeft, CgChevronDoubleRight, CgChevronLeft, CgChevronRight } from 'react-icons/cg'
import { FaEdit, FaInfoCircle, FaPlus, FaPlusCircle, FaTrash, FaTrashAlt } from 'react-icons/fa'
import Page from '../../../components/admin/Page'
import Links from '../../../components/admin/Links'
import ActiveLink from '../../../components/admin/ActiveLink'
import { useDispatch, useGetter } from '../../../store'
import { FaPencil } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

type Theme = {
    id: number
    title: string
    description: string
    created_at: Date
}
const DeleteAction = ({ item, rerender }: any) => {
    const destroy = useDispatch('sujet', 'destroy');
    const onClick = useCallback(() => {
        if (confirm(`Faut-il vraiment supprimer « ${item.name} » ?`)) {
            destroy(
                {
                    id: item.id,
                }, {
                index: null,
                success: "",
                error: "",
                path: "/api/sujet/" + item.id
            }
            )
            rerender();
        }

    }, [])
    return (
        <button onClick={onClick} className="btn flex flex-row items-center  bg-danger-500 btn-xs text-white  gap-1"><FaTrashAlt size={12} /><p className='text-sm'>Supprimer</p> </button>
    )
}
const index = () => {
    const sujets = useGetter('sujet', 'value', []);
    const meta = useGetter('sujet', 'meta', []);
    const fetch = useDispatch('sujet', 'fetch');

    // get theme 

    const themes = useGetter('theme', 'value', []);
    const fetchThemes = useDispatch('theme', 'fetch');

    const [search, setSearch] = React.useState<any>('')
    const [themeId, setThemeId] = React.useState<any>(1);
    const [sorting, setSorting] = React.useState<SortingState>([])

    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        })
    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const columns = React.useMemo<ColumnDef<Theme>[]>(
        () => [
            {
                id: 'check',
                header: ({ table }) => (
                    <div className='flex flex-row gap-2'>
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                        <p className='text-md'></p>
                    </div>
                ),
                cell: ({ row, getValue }: any) => {
                    return (
                        <div
                            className='flex flex-row gap-2 items-center'
                            style={{
                                paddingLeft: `${row.depth * 2}rem`,
                            }}
                        >
                            <div className='flex flex-row items-center gap-3'>
                                <IndeterminateCheckbox
                                    {...{
                                        checked: row.getIsSelected(),
                                        indeterminate: row.getIsSomeSelected(),
                                        onChange: row.getToggleSelectedHandler(),
                                    }}
                                />

                            </div>
                        </div>
                    )
                },
            },
            {
                accessorFn: row => row.id,
                id: 'id',
                cell: info => info.getValue(),
                header: () => <span>Id</span>
            },
            {
                accessorFn: row => row.title,
                id: 'Titre',
                cell: info => info.getValue(),
                header: () => <span>Titre</span>
            },
            {
                accessorFn: row => row.description,
                id: 'description',
                cell: info => info.getValue(),
                header: () => <span>Déscription</span>
            },
            {
                accessorFn: row => row.created_at,
                id: 'created_at',
                cell: info => info.getValue(),
                header: () => <span>Date de création</span>
            },
            {
                id: 'action',
                header: ({ table }) => (
                    <div className='flex flex-row gap-2'>

                        <p className='text-md'>Actions</p>
                    </div>
                ),
                cell: ({ row, getValue }: any) => {
                    return (
                        <div
                            className='flex flex-row gap-2'
                            style={{
                                paddingLeft: `${row.depth * 2}rem`,
                            }}
                        >
                            <div className='flex flex-row items-center gap-3'>

                                {/**<div className='ml-3'><Link to={`/admin/theme/detail/${row.original.id}`} className="btn bg-primary-500 btn-xs text-white flex flex-row items-center  gap-1"><FaInfoCircle size={14} /><p className='text-sm'>Détail</p> </Link></div>**/}
                                <div><Link to={`/admin/sujet/edit/${row.original.id}`} className="btn flex flex-row items-center  bg-secondary-500 btn-xs text-white  gap-1"><FaPencil size={12} /><p className='text-sm'>Editer</p> </Link></div>
                                <div><DeleteAction item={row.original} rerender={rerender} /></div>

                            </div>
                        </div>
                    )
                },
            }

        ],
        []
    )

    const [expanded, setExpanded] = React.useState<ExpandedState>({})
    const rerender = React.useReducer(() => ({}), {})[1]
    const table = useReactTable({
        data: sujets,
        columns,
        pageCount: meta.totalPages,
        state: {

            sorting,
            expanded,
            pagination
        },
        onPaginationChange: setPagination,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        debugTable: true,
    })
    //console.log('Theme',table.getState().rowSelection);
    useEffect(() => {
        fetchThemes({
            path: "/api/themes"
        })
    }, [])
    useEffect(() => {
        fetch({
            path: "/api/sujets"
        }, {
            pageSize: pageSize,
            page: pagination.pageIndex + 1,
            search: search,
            themeId: themeId
        });
    }, [pageSize, pagination, themeId,search])

    const debounceSearch = debounce((text: string) => {
        setSearch(text);
    }, 300)
    return (
        <Page>
            <Links title={"sujets de discussions"} description={"Ici vous pouvez faire la gestion de tous vos sujets de discussions"}>
                <ActiveLink title={"Gestion des clients"}></ActiveLink>
            </Links>
            <div className="flex flex-row justify-between items-center py-3">
                <div className="title">

                </div>
                <div className="action">
                    <Link to={"/admin/sujet/add"} className='btn btn-sm text-white bg-primary-500'><FaPlusCircle /> Ajouter un sujet</Link>
                </div>
            </div>

            <div className="alert py-3 alert-primary mb-2 flex flex-row gap-2" role="alert">
                <FaInfoCircle /> <p>Affichage des lignes {meta.currentPage == 1 ? 0 : meta.currentPage * 10} - {table.getRowModel().rows.length}  sur les {meta.totalItems} lignes</p>
            </div>
            <div className=" flex flex-row items-center gap-1">
                <label className='text-sm'>Theme: </label>
                <select className='select select-md w-72' onChange={(e:any) => setThemeId(e.target.value)}>
                    {themes.map((theme: any) => <option value={theme.id}>{theme.name}</option>)}
                </select>
            </div>
            <Pagination table={table} setSearch={debounceSearch} />

            <table className='table'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none flex flex-row gap-2 items-center'
                                                        : 'flex flex-row gap-2 items-center',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >


                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: '🔼',
                                                    desc: '🔽',
                                                }[header.column.getIsSorted() as string] ?? null}

                                                {/**{header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}**/}

                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {expanded && (
                <div className=" flex flex-row gap-x-2 ml-10">
                    <div className="my-3"><p className='text-sm'>Avec la sélection :</p></div>
                    <div className="flex flex-row">
                        <button disabled className="cursor-pointer btn  py-0 flex flex-row gap-1 items-center text-primary-500"><BsPencilFill /><p className='text-sm'>Editer</p></button>
                        <button disabled className="cursor-pointer btn flex flex-row gap-1 items-center text-danger-500"><FaTrash /><p className='text-sm'>Supprimer</p></button>
                    </div>
                </div>
            )}
            <Pagination table={table} search={search} setSearch={setSearch} />


        </Page>
    )
}
const Pagination = ({ table, search, setSearch }: any) => {
    const [state, setState] = useState(table.getState().pagination.pageIndex + 1);
    return (
        <div className="flex justify-between items-center gap-2 my-2 bg-slate-100">
            <div className="flex items-center gap-2  p-2">
                <button
                    className={`border cursor-pointer ${!table.getCanPreviousPage() ? 'bg-primary-300' : 'bg-primary-500'} text-white rounded p-1`}
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <CgChevronDoubleLeft />
                </button>
                <button
                    className={`cursor-pointer p-1 border text-white ${!table.getCanPreviousPage() ? 'bg-primary-300' : 'bg-primary-500'}`}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <CgChevronLeft />
                </button>
                <span className="flex items-center gap-1">
                    <input
                        defaultValue={state}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                            setState(page);
                        }}
                        className="input input-sm border w-14 bg-white"
                    />
                </span>
                <button
                    className={` border p-1 rounded  text-white cursor-pointer ${!table.getCanNextPage() ? 'bg-primary-300' : 'bg-primary-500'}`}

                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <CgChevronRight />
                </button>
                <button
                    className={` border p-1 rounded  text-white cursor-pointer ${!table.getCanNextPage() ? 'bg-primary-300' : 'bg-primary-500'}`}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <CgChevronDoubleRight />
                </button>


                <p className='text-sm'>| Nombre de lignes</p>
                <select
                    className='select select-sm  border w-14 bg-white'
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>

            </div>
            <div className="flex items-center gap-1">
                <p className='text-sm'>Filter les lignes:</p>
                <input
                    className="input input-sm bg-white w-64"
                    onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSearch(e.target.value);
                    }}
                    defaultValue={search}
                    placeholder='Rechercher ....' />
            </div>

        </div>
    )
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            className="checkbox checkbox-primary cursor-pointer"
            ref={ref}
            {...rest}
        />
    )
}
export default index;