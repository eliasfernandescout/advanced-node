import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors'
export interface IFacebookAuthentication {
  auth: (token: NFacebookAuthentication.Params) => Promise<NFacebookAuthentication.Result>
}

export namespace NFacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
