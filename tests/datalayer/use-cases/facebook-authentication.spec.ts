import { FacebookAuthentication } from '@/domain/use-cases'

class FacebookAuthentcationUseCase {
    constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) { }
    async perform(params: FacebookAuthentication.Params): Promise<void> {
        await this.loadFacebookUserApi.loadUser(params)
    }
}
interface ILoadFacebookUserApi {
    loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>

}

namespace LoadFacebookUserApi {
    export type Params = {
        token: string
    }
}

class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
    token?: string

    async loadUser(params: LoadFacebookUserApi.Params): Promise<void> {
        this.token = params.token
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
