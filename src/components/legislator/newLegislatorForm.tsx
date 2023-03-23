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
  state: z.nativeEnum(State).refine((val) => val !== "UNKNOWN", {
    message: "Please select a valid state",
  }),
  party: z.nativeEnum(Party).refine((val) => val !== "UNKNOWN", {
    message: "Please select a valid party",
  }),
  chamber: z.nativeEnum(Chamber).refine((val) => val !== "UNKNOWN", {
    message: "Please select a valid chamber",
  }),
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
    <div className="prose-h2 card m-10 bg-neutral p-6">
      <h2 className="text-center">Create New Legislator</h2>
      <Formik
        validationSchema={toFormikValidationSchema(formSchema)}
        validateOnBlur={false}
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
          <Form className="grid place-items-start gap-4 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="firstName">First Name</label>
              <div>
                <Field className="input" id="firstName" name="firstName" />
                <ErrorMessage
                  name="firstName"
                  render={(msg) => errorMessage(msg)}
                />
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="lastName">Last Name</label>
              <div>
                <Field className="input" id="lastName" name="lastName" />
                <ErrorMessage
                  name="lastName"
                  render={(msg) => errorMessage(msg)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="state">State</label>
              <div>
                <Field className="select" as="select" id="state" name="state">
                  <option>Hello</option>
                </Field>
                <ErrorMessage
                  name="state"
                  render={(msg) => errorMessage(msg)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="party">Party</label>
              <div>
                <Field className="select" as="select" id="party" name="party">
                  <option>Hello</option>
                </Field>
                <ErrorMessage
                  name="party"
                  render={(msg) => errorMessage(msg)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="chamber">Chamber</label>
              <div>
                <Field
                  className="select"
                  as="select"
                  id="chamber"
                  name="chamber"
                >
                  <option>Hello</option>
                </Field>
                <ErrorMessage
                  name="chamber"
                  render={(msg) => errorMessage(msg)}
                />
              </div>
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
