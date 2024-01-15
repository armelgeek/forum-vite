import { useState, FormEvent } from 'react'
import { AxiosResponse, AxiosError } from 'axios'

type PartialErrorRecord<T extends string | number | symbol> = Partial<
    Record<T, string | string[]>
>

interface ServerValidationError {
    message: string
    field: string
    validation: string
}

export function useForm<
    FormInput extends { [key: string]: any },
    Errors = PartialErrorRecord<keyof FormInput>
>({
    defaultValues,
    onSubmit,
    onSuccess
}: {
    defaultValues: FormInput
    onSubmit: (
        form: FormInput
    ) => void
    onSuccess?: <T>(payload: {
        response: AxiosResponse<T>
        form: FormInput
    }) => void
}) {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<FormInput>(defaultValues || {})
    const [errors, setErrors] = useState<Errors>()

    const setValue = (field: keyof FormInput, value: any) => {
        setForm({
            ...form,
            [field]: value
        })
        setErrors({
            ...errors,
            [field]: undefined
        } as any)
    }

    const submit = async (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        setLoading(true)
        onSubmit(form)
        setLoading(false)

    }

    const resetForm = () => {
        setForm(defaultValues || {})
    }

    return {
        form,
        errors,
        submit,
        loading,
        setForm,
        setValue,
        resetForm
    }
}
