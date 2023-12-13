export const validationData = {
  email: {
    required: { value: true, message: "Required" },
  },
  password: {
    minLength: {
      value: 8,
      message: "Password must contains more or equal than 8 symbols",
    },
    maxLength: {
      value: 15,
      message: "Password must contains less or equal than 15 symbols",
    },
    required: { value: true, message: "Required" },
  },
  name: {
    required: { value: true, message: "Required" },
  },
};
