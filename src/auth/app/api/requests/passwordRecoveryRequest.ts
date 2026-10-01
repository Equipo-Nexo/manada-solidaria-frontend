export type PasswordRecoveryRequest = {
  email: string;
};

export type VerifyCodeRequest = {
  email: string;
  code: string;
};

export type NewPasswordRequest = {
  resetToken: string;
  newPassword: string;
  newPasswordVerification: string;
};
