import { ILoadFacebookUserApi, LoadFacebookUserApi } from '@/datalayer/contracts/apis'
import { FacebookAuthentcationUseCase } from '@/datalayer/use-cases'
import { AuthenticationError } from '@/domain/errors'

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
