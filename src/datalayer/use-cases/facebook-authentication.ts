import { ILoadFacebookUserApi } from '@/datalayer/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/use-cases'

export class FacebookAuthentcationUseCase {
    constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) { }

    async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.loadFacebookUserApi.loadUser(params)
        return new AuthenticationError()
    }
}
