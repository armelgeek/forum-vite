import { FieldApi, useForm } from '@tanstack/react-form'
import React from 'react'
import Page from '../../../components/admin/Page'
import Links from '../../../components/admin/Links'
import ActiveLink from '../../../components/admin/ActiveLink'
import { FaSpinner } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useDispatch } from '../../../store'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <small className='text-xs text-danger-400'>{field.state.meta.touchedErrors}</small>
      ) : null}
    </>
  )
}

const AdminThemeAdd = () => {
  const create = useDispatch('theme', 'create');
  const history = useHistory();
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    onSubmit: async ({ value }: any) => {
      create({
        name:value.name,
        description: value.description
      }, {
        error: "une erreur c'est produite",
        success: "Une nouvelle theme ajoutée",
        path: '/api/theme'
      })
      history.push('/admin/themes');
    }
  })
  return (
    <Page>
      <Links title={"Créer un theme"} description={"Ici vous pouvez creer un theme"}>
        <ActiveLink title={"Créer un theme"}></ActiveLink>
      </Links>
      <div className="w-1/2 my-3 rounded-primary border border-slate-300 bg-white p-4 shadow dark:border-slate-600 dark:bg-slate-800">
        <div className="w-full">
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
                  name="name"
                  validators={{
                    onChange: ({ value }: any) =>
                      !value
                        ? 'Le nom est requis'
                        : value.length < 3
                          ? 'Le nom doit contenir au moins 3 caracteres'
                          : undefined,
                    onChangeAsyncDebounceMs: 500,
                  }}
                  children={(field) => {
                    return (
                      <>
                        <label className="label mb-1" htmlFor={field.name}>
                          Nom
                        </label>
                        <input
                          id={field.name}
                          className="input input-md"
                          placeholder='Nom'
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
                  name="description"
                  children={(field) => (
                    <>
                      <label className="label mb-1" htmlFor={field.name}>
                        Déscription
                      </label>
                      <textarea
                        id={field.name}
                        className="input input-md"
                        placeholder='Déscription'
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
                      {isSubmitting ? <FaSpinner /> : ''} Enregistrer
                    </button>
                  )}
                />
                <button type="reset" className="btn bg-secondary-500 text-white">Annuler</button>

              </div>

            </form>
          </form.Provider>
        </div>
      </div></Page>)
}
export default AdminThemeAdd;