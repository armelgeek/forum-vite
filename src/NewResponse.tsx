import React from 'react'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

const NewResponse = () => {
    const form = useForm({
        defaultValues: {
            response: '',
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })
    return (
        <>
            <div className="">
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item active'>
                        <a href="#">Forum</a>
                    </li>
                    <li className='breadcrumb-item'>
                        <a href="#">Fun</a>
                    </li>
                    <div className="breadcrumb-item">
                        <a href="#">Les interviews de wanes</a>
                    </div>
                </ol>
                <div className="bg-primary-500 px-5 py-2 mt-9 w-full  rounded-lg">
                    <h5 className="uppercase text-white mb-2">Ecrire une reponse</h5>
                    <form.Provider>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                void form.handleSubmit()
                            }}
                        >
                           
                            <div>
                                <form.Field
                                    name="response"
                                    children={(field) => (
                                        <>
                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                className='input rounded-none bg-white'
                                                rows={10}
                                                placeholder="Veuillez ecrire votre message et l'envoyer"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="">
                                    <a href="/" className='text-pink-500'>Retour</a>
                                </div>
                                <div className="action">
                                    <form.Subscribe
                                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                                        children={([canSubmit, isSubmitting]) => (
                                            <button type="submit" className='btn bg-pink-500 text-white' disabled={!canSubmit}>
                                                {isSubmitting ? '...' : 'Envoyer'}
                                            </button>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </form.Provider>
                </div>
            </div >
        </>
    )
}
export default NewResponse;