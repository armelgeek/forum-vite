import React from "react";
import * as Yup from "yup";
import Content from "./components/admin/Content";
import Page from "./components/admin/Page";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";

export interface LoginInput {
  email: string
  password: string
}
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
const Home = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <Content>
      <Page>
        <h1>Simple Form Example</h1>
        <form.Provider>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div>
              {/* A type-safe field component*/}
              <form.Field
                name="firstName"
                asyncDebounceMs={500}
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "A first name is required"
                      : value.length < 3
                        ? "First name must be at least 3 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <div className="flex flex-col">
                      <label htmlFor={field.name}>First Name:</label>
                      
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="lastName"
                asyncDebounceMs={500}
                children={(field) => (
                  <div className="flex flex-col">
                    <label htmlFor={field.name}>Last Name:</label>
                   
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Submit"}
                </button>
              )}
            />
          </form>
        </form.Provider>
      </Page>
    </Content>
  );
};
export default Home;
