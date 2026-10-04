export type PasswordRecoveryRequest = {
  email: string;
};

export type VerifyCodeRequest = {
  email: string;
  code: string;
};
