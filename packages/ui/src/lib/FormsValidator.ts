import validator from 'validator';
import { decodeBase16 } from 'casperlabs-sdk';

// These methods implement validators which can be used in formState library.
// When there is a error, returns a message, otherwise returns false.

export const valueRequired = (val: any) => !val && 'Value required';

export const numberGreaterThan: (n: number) => (val: number) => string | false = (n: number) => {
  return (val: number) => {
    return !(val > n) && `Value should bigger than ${n}`;
  };
};

export const validateInt = (n: number) => !validator.isInt(n.toString()) && 'Value should be an Integer';

export const validateBase16 = (val: string) => {
  try {
    decodeBase16(val);
  } catch (e) {
    return 'Could not decode as Base16 hash.';
  }
  return false; // indicate no error
};

export const validateBlockHashBase16 = (hashBase16: string) => {
  if (hashBase16.length !== 64)
    return 'This Hash has to be 64 characters long.';

  return validateBase16(hashBase16);
};
