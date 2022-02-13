import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ILoadUserRepository, ICreateFacebookAccountRepository } from '@/data/contracts/repositories'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/use-cases'

export class FacebookAuthentcationUseCase {
  constructor(
    private readonly loadFacebookUserApi: ILoadFacebookUserApi,
    private readonly loadUserAccountRepository: ILoadUserRepository,
    private readonly createFacebookAccountRepository: ICreateFacebookAccountRepository
  ) { }

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.loadFacebookUserApi.loadUser(params)
    await this.loadUserAccountRepository.load({ email: facebookData?.email })
    await this.createFacebookAccountRepository.createFromFacebook(facebookData)
    return new AuthenticationError()
  }
}

// #################################################################################
// -------> OUTRO METODO DE ESCREVER O CODIGO ACIMA

// export class FacebookAuthentcationUseCase {
//   constructor(
//     private readonly facebookApi: ILoadFacebookUserApi,
//     private readonly userAccountRepository: ILoadUserRepository & ICreateFacebookAccountRepository
//   ) { }

//   async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
//     const facebookData = await this.facebookApi.loadUser(params)
//     await this.userAccountRepository.load({ email: facebookData?.email })
//     await this.userAccountRepository.createFromFacebook(facebookData)
//     return new AuthenticationError()
//   }
// }
