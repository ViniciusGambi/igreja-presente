export default {
  jwt: {
    secret: process.env.APP_SCRET,
    expiresIn: '10d',
  },
};
