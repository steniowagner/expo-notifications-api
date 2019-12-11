type Err = Error & { errors: object };

const getErrorStatusCode = (err: Err): number => {
  if (!err.errors) {
    return 500;
  }

  const hasFieldErrors = Object.keys(err.errors).length > 0;

  const status = hasFieldErrors ? 400 : 500;

  return status;
};

export default getErrorStatusCode;
