import { FieldApi, useForm } from '@tanstack/react-form'
import React, { useContext, useEffect } from 'react'
import Page from '../../../components/admin/Page'
import Links from '../../../components/admin/Links'
import ActiveLink from '../../../components/admin/ActiveLink'
import { FaSpinner } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useDispatch, useGetter } from '../../../store'
import { AuthContext } from '../../../store/Provider/AuthProvider'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <small className='text-xs text-danger-400'>{field.state.meta.touchedErrors}</small>
      ) : null}
    </>
  )
}

const AdminSujetAdd = () => {
  const create = useDispatch('sujet', 'create');
  // get theme 

  const themes = useGetter('theme', 'value', []);
  const {state} = useContext(AuthContext);
  const fetchThemes = useDispatch('theme', 'fetch');
  const [themeId, setThemeId] = React.useState<any>(1);
  const history = useHistory();
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    onSubmit: async ({ value }: any) => {
      create({
        title: value.name,
        description: value.description,
        theme_id: parseInt(themeId),
        user_id: state.user.id
      }, {
        error: "une erreur c'est produite",
        success: "Une nouvelle sujet ajoutée",
        path: '/api/sujet'
      })
      history.push('/admin/sujets');
    }
  })
  useEffect(() => {
    fetchThemes({
      path: "/api/themes"
    })
  }, [])
  return (
    <Page>
      <Links title={"Créer un sujet"} description={"Ici vous pouvez creer un sujet"}>
        <ActiveLink title={"Créer un sujet"}></ActiveLink>
      </Links>
      <div className="w-full flex flex-row gap-2 my-3 ">
        <div className="w-1/2 rounded-primary border border-slate-300 bg-white p-4 shadow dark:border-slate-600 dark:bg-slate-800">
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
                    <button type="submit" className="btn bg-primary-500 text-white" disabled={!canSubmit && themeId}>
                      {isSubmitting ? <FaSpinner /> : ''} Enregistrer
                    </button>
                  )}
                />
                <button type="reset" className="btn bg-secondary-500 text-white">Annuler</button>

              </div>

            </form>
          </form.Provider>
        </div>
        <div className="w-1/2 h-24 rounded-primary border border-slate-300 bg-white px-4 py-2 shadow dark:border-slate-600 dark:bg-slate-800">
        <label className='text-sm py-3 text-danger-500 uppercase mb-1'>Theme</label>
          <div className=" flex flex-row items-center gap-1">
            
            <select className='select select-md w-72' onChange={(e: any) => setThemeId(e.target.value)}>
              {themes.map((theme: any) => <option value={theme.id}>{theme.name}</option>)}
            </select>
          </div>
        </div>
      </div></Page>)
}
export default AdminSujetAdd;