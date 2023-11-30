import { Injectable } from '@nestjs/common';
import { LoginFactory } from './gof/login-factory';
import { LoginFactoryEnum } from './gof/login-factory.enum';

@Injectable()
export class AppService {

  private userList = [
    {
      email: "vasbka@test.com", password: "test123",
    },
    {
      email: "rusik@test.com", password: "123test",
    }
  ]


  public loginByEmailPassword(email, password) {
    const strategy = LoginFactory.getLoginStrategy(LoginFactoryEnum.LOGIN_PASSWORD);
    const user = strategy.login(email, password, this.userList)
    return strategy.loginVerify({user: user, inputPassword: password, userList: this.userList })
  }


  public loginByEmailPasswordCode(email, password) {
    const strategy = LoginFactory.getLoginStrategy(LoginFactoryEnum.LOGIN_PASSWORD_CODE);
    const resultLogin = strategy.login(email, password, this.userList)
    this.userList = this.userList.map((user) => {
      if (user.email == email) {
        return {
          ...user,
          code: resultLogin.code
        }
      } else {
        return user;
      }
    })
    return resultLogin;
  }


  public verifyEmailPasswordCode(email, password, code) {
    const strategy = LoginFactory.getLoginStrategy(LoginFactoryEnum.LOGIN_PASSWORD_CODE);
    const user = this.userList.find((user) => user.email == email)
    return strategy.loginVerify({inputCode: code, inputPassword: password, user: user, userList: this.userList})
  }
}
