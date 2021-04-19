interface Error {
    [key: string]: string
}

const errors: Error = {
  'Combination email and password is not valid': 'Email e/ou password inválidos',
};

export default errors;
