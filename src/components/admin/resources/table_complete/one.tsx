import React, { HTMLAttributes, HTMLProps } from 'react'
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
import { FaEdit, FaInfoCircle, FaPlus, FaPlusCircle, FaTrash } from 'react-icons/fa'

export type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: 'relationship' | 'complicated' | 'single'
    subRows?: Person[]
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const defaultData: any[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

function OneOne() {
    const rerender = React.useReducer(() => ({}), {})[1]
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

    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'firstName',
                header: ({ table }) => (
                    <div className='flex flex-row gap-2'>
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                        <p className='text-md'>First name</p>
                    </div>
                ),
                cell: ({ row, getValue }) => (
                    <div
                        className='flex flex-row gap-2 items-center'
                        style={{
                            paddingLeft: `${row.depth * 2}rem`,
                        }}
                    >
                        <>
                            <IndeterminateCheckbox
                                {...{
                                    checked: row.getIsSelected(),
                                    indeterminate: row.getIsSomeSelected(),
                                    onChange: row.getToggleSelectedHandler(),
                                }}
                            />

                            {getValue()}
                        </>
                    </div>
                ),
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>
            },
        ],
        []
    )

    const [expanded, setExpanded] = React.useState<ExpandedState>({})

    const table = useReactTable({
        data: defaultData,
        columns,
        pageCount: 1,
        state: {
            sorting,
            expanded,
            pagination
        },
        onPaginationChange: setPagination,
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        debugTable: true,
    })

    return (
        <div className="px-3">
            <div className="flex flex-row justify-between items-center py-3">
                <div className="title">
                  
                </div>
                <div className="action">
                    <button type="button" className='btn text-white bg-primary-500'><FaPlusCircle /> Ajouter un client</button>
                </div>
            </div>

            <div className="alert py-3 alert-primary mb-2 flex flex-row gap-2" role="alert">
                <FaInfoCircle /> <p>Affichage des lignes 0 -  sur les {table.getRowModel().rows.length}</p>
            </div>
            <div className=" flex flex-row ">
                <div className="btn btn-xs border"><FaPlus />options</div>
            </div>
            <Pagination table={table} />

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
            <div className=" flex flex-row gap-x-2 ml-10">
                <div className="my-3"><p className='text-sm'>Avec la sélection :</p></div>
                <div className="flex flex-row">
                    <button disabled className="cursor-pointer btn  py-0 flex flex-row gap-1 items-center text-primary-500"><BsPencilFill /><p className='text-sm'>Editer</p></button>
                    <button disabled className="cursor-pointer btn flex flex-row gap-1 items-center text-red-500"><FaTrash /><p className='text-sm'>Supprimer</p></button>
                </div>
            </div>
            <Pagination table={table} />


        </div>
    )
}
const Pagination = ({ table }: any) => {
    return (
        <div className="flex justify-between items-center gap-2 my-2 bg-slate-100">
            <div className="flex items-center gap-2  p-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <CgChevronDoubleLeft />
                </button>
                <button
                    className="cursor-pointer"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <CgChevronLeft />
                </button>
                <span className="flex items-center gap-1">
                    <input
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="input input-sm border w-14 bg-white"
                    />
                </span>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <CgChevronRight />
                </button>
                <button
                    className="border rounded p-1"
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
                <input className="input input-sm bg-white w-64" placeholder='Rechercher ....' />
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

export default OneOne;