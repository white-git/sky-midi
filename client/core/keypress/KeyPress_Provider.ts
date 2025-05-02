import { KeyPress_App } from './domain/KeyPress_App'
import { KeyPressApi } from './data/KeyPressApi'

export class KeyPress_Provider {
  static createKeyPressApp() {
    return new KeyPress_App(new KeyPressApi())
  }
}
