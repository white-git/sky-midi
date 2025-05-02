import { KeyPressApi_Repository } from '../domain/KeyPressApi_Repository'
import { KeyPressCode } from '../domain/models/KeyPressCode'
import { Either } from '../../common/domain/Either'

export class KeyPressApi implements KeyPressApi_Repository {
  async keyToggle(code: KeyPressCode): Promise<Either<Error, void>> {
    const url = new URL('http://localhost:3000/press')
    url.searchParams.append('key', code)

    const result = await fetch(url)

    if (!result.ok) {
      return Either.left(new Error('Can not do key press'))
    }

    return Either.right(void 0)
  }
}
