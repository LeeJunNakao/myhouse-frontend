/* eslint-disable import/prefer-default-export */
import errors from './errors';

export const translateError = (error: string): string => {
  const translation: string = errors[error];
  if (translation) return translation;
  return error;
};
