import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const AuthForm = ({ isRegistering, onSubmit, error }) => {
  const validateFile = (file) => {
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        return "Please upload a valid image file (JPEG, PNG)";
      }
      if (file.size > 5 * 1024 * 1024) {
        return "File size should be less than 5MB";
      }
    }
    return undefined;
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", image: null }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (isRegistering && values.image) {
          const fileError = validateFile(values.image);
          if (fileError) errors.image = fileError;
        }
        return errors;
      }}
    >
      {({ setFieldValue, isSubmitting, errors }) => (
        <Form className="space-y-6">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          {isRegistering && (
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
          {/* 
          {isRegistering && (
            <label className="form-control w-full max-w-s mb-4">
              <div className="label">
                <span className="label-text">Pick a photo</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-s"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
            </label>
          )} */}

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
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-800">
              Sign up
            </Link>{" "}
            here!{" "}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
