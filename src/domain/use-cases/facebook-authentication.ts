export interface FacebookAuthentication {
    auth: (token: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
    export type Params = {
        token: string
    }

    export type Result = AccessToken | AuthenticationError
}

type AccessToken = {
    accesToken: string
}

class AuthenticationError extends Error {
    constructor() {
        super('Authentication failed')
        this.name = 'AuthenticationError'
    }
}
