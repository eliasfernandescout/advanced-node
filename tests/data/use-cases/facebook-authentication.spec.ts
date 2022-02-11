import { ILoadFacebookUserApi, LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthentcationUseCase } from '@/data/use-cases'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
  token?: string
  callsCount = 0
  result: undefined

  async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}

describe('FacebookAuthentcationUseCase', () => {
  it('should call LoadFacebookUserApiSpy with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const systemUnderTest = new FacebookAuthentcationUseCase(loadFacebookUserApi)

    await systemUnderTest.perform({ token: 'any-token' })

    expect(loadFacebookUserApi.token).toBe('any-token')
    expect(loadFacebookUserApi.callsCount).toBe(1)
  })
})

describe('FacebookAuthentcationUseCase', () => {
  it('should return authentication error when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const systemUnderTest = new FacebookAuthentcationUseCase(loadFacebookUserApi)

    const authResult = await systemUnderTest.perform({ token: 'any-token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
