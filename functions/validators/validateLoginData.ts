import { isEmpty } from 'lodash';

export const validateLoginData = (data: any) => {
  let errors: any = {};

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
