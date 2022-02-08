import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/use-cases'

class FacebookAuthentcationUseCase {
    constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) { }
    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.loadFacebookUserApi.loadUser(params)
        return new AuthenticationError()
    }
}
interface ILoadFacebookUserApi {
    loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>

}

namespace LoadFacebookUserApi {
    export type Params = {
        token: string
    }

    export type Result = undefined
}

class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
    token?: string
    result: undefined

    async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
        this.token = params.token
        return this.result
    }
}

describe('FacebookAuthentcationUseCase', () => {
    it('should call LoadFacebookUserApiSpy with correct params', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy()
        const sut = new FacebookAuthentcationUseCase(loadFacebookUserApi)

        await sut.perform({ token: 'any-token' })

        expect(loadFacebookUserApi.token).toBe('any-token')
    })
})

describe('FacebookAuthentcationUseCase', () => {
    it('should return authentication error when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy()
        loadFacebookUserApi.result = undefined
        const sut = new FacebookAuthentcationUseCase(loadFacebookUserApi)

        const authResult = await sut.perform({ token: 'any-token' })

        expect(authResult).toEqual(new AuthenticationError())
    })
})
