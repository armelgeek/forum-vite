import React from 'react'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
        </>
    )
}

const ResourceForm = () => {
    const form = useForm({
        defaultValues: {
            firstName: 'd',
            lastName: '',
        },
        onSubmit: async ({ value }: any) => {
            // Do something with form data
            console.log(value)
        }
    })
    return (
        <div>
            <form.Provider>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                >
                    <div className="w-full">

                        <form.Field
                            name="firstName"
                            validators={{
                                onChange: ({ value }: any) =>
                                    !value
                                        ? 'A first name is required'
                                        : value.length < 3
                                            ? 'First name must be at least 3 characters'
                                            : undefined,
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                    return (
                                        value.includes('error') &&
                                        'No "error" allowed in first name'
                                    )
                                },
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <>
                                        <label className="label mb-1" htmlFor={field.name}>
                                            First name
                                        </label>
                                        <input
                                            id={field.name}
                                            className="input input-md"
                                            placeholder='First Name'
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )
                            }}
                        />
                    </div>
                    <div>
                        <form.Field
                            name="lastName"
                            children={(field) => (
                                <>
                                    <label className="label mb-1" htmlFor={field.name}>
                                        Last name
                                    </label>
                                    <input
                                        id={field.name}
                                        className="input input-md"
                                        placeholder='Last Name'
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        />
                    </div>
                    <div className="mt-6 flex w-full items-center justify-end gap-2">
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button type="submit" className="btn bg-primary-500 text-white" disabled={!canSubmit}>
                                    {isSubmitting ? '...' : 'Submit'}
                                </button>
                            )}
                        />
                        <button className="btn bg-secondary-500 text-white" type="button">Cancel</button>

                    </div>

                </form>
            </form.Provider>

        </div>
    )
}
export default ResourceForm;