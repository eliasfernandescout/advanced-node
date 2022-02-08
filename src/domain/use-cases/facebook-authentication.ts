import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors'
export interface FacebookAuthentication {
    auth: (token: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
    export type Params = {
        token: string
    }

    export type Result = AccessToken | AuthenticationError
}
