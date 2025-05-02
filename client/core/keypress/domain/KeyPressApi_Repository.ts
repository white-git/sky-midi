import { KeyPressCode } from '../domain/models/KeyPressCode'
import { Either } from '../../common/domain/Either'

export interface KeyPressApi_Repository {
  keyToggle(code: KeyPressCode): Promise<Either<Error, void>>
}
