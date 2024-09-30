import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { AD_TYPE, USER_TYPE } from "./calculator";

// TODO i18n all labels
export const userTypeOptions = [
  { value: USER_TYPE.PERSON, label: "Person" },
  { value: USER_TYPE.COMPANY, label: "Company" },
];

export const itemTypeOptions = [
  { value: AD_TYPE.AUCTION, label: "Auction" },
  { value: AD_TYPE.BUY_NOW, label: "Buy it now" },
];

const DEFAULT_OPTION_VALUE = -1;

const SelectOptions = ({ options }) => (
  <>
    <option value={DEFAULT_OPTION_VALUE} disabled hidden>
      Select...
    </option>
    {options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </>
);
SelectOptions.propTypes = {
  options: PropTypes.array.isRequired,
};

export const ErrorNotification = ({ ...props }) => {
  return (
    <ErrorMessage {...props}>
      {(msg) => <div className="invalid-feedback">{msg}</div>}
    </ErrorMessage>
  );
};

const AddItemForm = ({ onItemAdded }) => {
  const onSubmit = useCallback(
    ({ userType, itemType, ...other }) => {
      onItemAdded({
        ...other,
        userType: Number.parseInt(userType, 10),
        itemType: Number.parseInt(itemType, 10),
      });
    },
    [onItemAdded]
  );

  return (
    <>
      <h3>Register new item</h3>
      <Formik
        initialValues={{
          userType: DEFAULT_OPTION_VALUE,
          itemType: DEFAULT_OPTION_VALUE,
          price: 100,
          endDate: moment().format("YYYY-MM-DD"),
        }}
        validate={(values) => {
          const errors = {};
          if (values.userType < 0) {
            errors.userType = "selection required";
          }
          if (values.itemType < 0) {
            errors.itemType = "selection required";
          }
          // TODO validate for dates in past
          if (!values.endDate) {
            errors.endDate = "end date required";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ isValid, touched, errors }) => (
          <Form className="New-item-form">
            <div className="form-group">
              <label htmlFor="userType">You are</label>
              <Field // TODO accessibility
                id="userType"
                name="userType"
                as="select"
                className={classNames(
                  "form-control",
                  errors.userType && touched.userType && "is-invalid"
                )}
              >
                <SelectOptions options={userTypeOptions} />
              </Field>
              <ErrorNotification name="userType" />
            </div>

            <div className="form-group">
              <label htmlFor="itemType">Item Type</label>
              <Field
                id="itemType"
                name="itemType"
                as="select"
                className={classNames(
                  "form-control",
                  errors.itemType && touched.itemType && "is-invalid"
                )}
              >
                <SelectOptions options={itemTypeOptions} />
              </Field>
              <ErrorNotification name="itemType" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Field
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                max="100000000"
                validate={(price) => {
                  if (!price || price < 0) return "Invalid price";
                }}
                className={classNames(
                  "form-control",
                  errors.price && "is-invalid"
                )}
              />
              <ErrorNotification name="price" />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End date</label>
              <Field
                id="endDate"
                name="endDate"
                type="date" // TODO apply styling for uniform look regardless of platform
                className={classNames(
                  "form-control",
                  errors.endDate && "is-invalid"
                )}
              />
              <ErrorNotification name="endDate" />
            </div>

            <button
              type="submit"
              disabled={!isValid && touched.itemType && touched.userType}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
AddItemForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default AddItemForm;
