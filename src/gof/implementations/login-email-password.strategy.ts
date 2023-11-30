import { LoginStrategy } from '../interfaces/login-strategy';
import { BadRequestException } from '@nestjs/common';

export class LoginEmailPasswordStrategy implements LoginStrategy {
  public login(email: string, password: string, userList: ({ password: string; email: string })[]) {
    const user = userList.find((it) => it.email == email)
    if (!user) {
      throw new BadRequestException()
    }
    this.additionalManipulating()
    return { email: user.email}
  }

  loginVerify(parameters: any) {
    const user: {email: string} = parameters.user;
    const inputPassword = parameters.inputPassword;
    const userFromList = parameters.userList.find((it) => it.email == user.email);
    const userPassword = userFromList.password
     if (inputPassword == userPassword){
       return userFromList;
     }
     return null;
  }

  additionalManipulating() {
  }
}
