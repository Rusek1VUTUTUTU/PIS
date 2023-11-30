import { LoginFactoryEnum } from './login-factory.enum';
import { LoginEmailPasswordStrategy } from './implementations/login-email-password.strategy';
import { LoginEmailPasswordCodeStrategy } from './implementations/login-email-password-code.strategy';
import { LoginStrategy } from './interfaces/login-strategy';

export class LoginFactory {
  static getLoginStrategy(loginFactoryEnum: LoginFactoryEnum): LoginStrategy {
    if (loginFactoryEnum == LoginFactoryEnum.LOGIN_PASSWORD_CODE) {
      return new LoginEmailPasswordCodeStrategy();
    }
    if (loginFactoryEnum == LoginFactoryEnum.LOGIN_PASSWORD) {
      return new LoginEmailPasswordStrategy();
    }
  }
}
