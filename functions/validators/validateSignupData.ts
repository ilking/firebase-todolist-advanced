import { isEmpty, get } from 'lodash';

export const validateSignupData = (data: any) => {
  const errors: any = {};

  const requiredFields = ['email', 'firstName', 'lastName', 'phoneNumber', 'country', 'password', 'username'];

  requiredFields.forEach(fieldName => {
    if (isEmpty(get(data, [fieldName]))) {
      errors[fieldName] = 'Must not be empty';
    }
  });

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords must be the same';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
