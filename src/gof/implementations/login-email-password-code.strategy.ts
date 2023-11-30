import { LoginStrategy } from '../interfaces/login-strategy';
import { BadRequestException } from '@nestjs/common';

export class LoginEmailPasswordCodeStrategy implements LoginStrategy {
  public login(email: string, password: string, userList: ({ password: string; email: string })[]) {
    const user = userList.find((it) => it.email == email)
    if (!user) {
      throw new BadRequestException()
    }
    let code = this.additionalManipulating();
    console.log(code)
    return { email: user.email, code: code}
  }

  loginVerify(parameters: any): Boolean {
    const user: {email: string} = parameters.user;
    const inputPassword = parameters.inputPassword;
    const inputCode = parameters.inputCode;
    const userFromList = parameters.userList.find((it) => it.email == user.email);
    const userPassword = userFromList.password
    if (inputPassword == userPassword && inputCode == userFromList.code){
      return userFromList;
    }
    return null;
  }

  additionalManipulating() {
    return Math.floor(Math.random() * (999999 - 100000) + 100000);
  }
}
