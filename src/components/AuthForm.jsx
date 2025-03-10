import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const AuthForm = ({
  isRegistering,
  isVetRegistering,
  isVetLogIn,
  handleSubmit,
}) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {isRegistering && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full input input-bordered"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {isVetRegistering && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <Field
                      type="text"
                      name="address"
                      className="w-full input input-bordered"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      className="w-full input input-bordered"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <Field
              type="email"
              name="email"
              className="w-full input input-bordered"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <Field
              type="password"
              name="password"
              className="w-full input input-bordered"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : isRegistering
              ? "Register"
              : "Login"}
          </button>

          <p className="mt-4 text-center">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <Link
                  to={isVetRegistering ? "/vet/login" : "/login"}
                  className="font-medium"
                >
                  Login
                </Link>{" "}
                here!
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link
                  to={isVetLogIn ? "/vet/signup" : "/signup"}
                  className="font-medium"
                >
                  Sign up
                </Link>{" "}
                here!{" "}
              </>
            )}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
