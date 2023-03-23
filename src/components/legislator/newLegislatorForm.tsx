import { Legislator, State, Party, Chamber } from "@prisma/client";
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  FormikProps,
  ErrorMessage,
} from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { z } from "zod";

interface Props {
  onSuccess: (newLegislator: Legislator) => void;
  onError: (error: Error) => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  state: State;
  party: Party;
  chamber: Chamber;
}

const formSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "Name can only contain letters",
    })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Cannot contain numbers or symbols",
    })
    .trim()
    .min(1, { message: "Must be at least 1 character long" }),
  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Name can only contain letters",
    })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Cannot contain numbers or symbols",
    })
    .trim()
    .min(1, { message: "Must be at least 1 character long" }),
  state: z.nativeEnum(State),
  party: z.nativeEnum(Party),
  chamber: z.nativeEnum(Chamber),
});

const NewLegislatorForm = ({ onSuccess, onError }: Props) => {
  const createLegislator = api.legislator.create.useMutation();

  function handleSubmit(values: FormValues) {
    console.log(values);
  }

  // Render custom error message with styling
  const errorMessage = (message: string) => {
    return <p className="text-error">{message}</p>;
  };

  return (
    <div className="m-12 rounded-md bg-gray-800 p-4">
      <h1 className="pb-4 text-center">Create New Legislator</h1>
      <Formik
        validationSchema={toFormikValidationSchema(formSchema)}
        initialValues={{
          firstName: "",
          lastName: "",
          state: "UNKNOWN",
          party: "UNKNOWN",
          chamber: "UNKNOWN",
        }}
        onSubmit={(
          values: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          handleSubmit(values);
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form className="grid gap-2 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="firstName">First Name</label>
              <Field className="input" id="firstName" name="firstName" />
              <ErrorMessage
                name="firstName"
                render={(msg) => errorMessage(msg)}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="lastName">Last Name</label>
              <Field className="input" id="lastName" name="lastName" />
              <ErrorMessage
                name="lastName"
                render={(msg) => errorMessage(msg)}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <Field className="select" as="select" id="state" name="state">
                <option>Hello</option>
              </Field>
            </div>
            <div>
              <label htmlFor="party">Party</label>
              <Field className="select" as="select" id="party" name="party">
                <option>Hello</option>
              </Field>
            </div>
            <div>
              <label htmlFor="chamber">Chamber</label>
              <Field className="select" as="select" id="chamber" name="chamber">
                <option>Hello</option>
              </Field>
            </div>
            <div className="">
              <button className="btn-success btn" type="submit">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewLegislatorForm;
