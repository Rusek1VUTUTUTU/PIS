export interface LoginStrategy {
  login(email: string, password: string, userList: ({ password: string; email: string })[]);
  additionalManipulating()
  loginVerify(parameters: any)
}
