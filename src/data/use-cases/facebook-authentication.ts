import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ILoadUserAccountRepository, ISaveFacebookAccountRepository } from '@/data/contracts/repositories'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/use-cases'

// #################################################################################
// INTERSECTION TYPES
// -------> OUTRO METODO DE ESCREVER O CODIGO ACIMA
export class FacebookAuthentcationUseCase {
  constructor(
    private readonly facebookApi: ILoadFacebookUserApi,
    private readonly userAccountRepository: ILoadUserAccountRepository & ISaveFacebookAccountRepository
  ) { }

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.facebookApi.loadUser(params)

    if (facebookData !== undefined) {
      const accountData = await this.userAccountRepository.load({ email: facebookData.email })

      await this.userAccountRepository.saveWithFacebook({
        id: accountData?.id,
        name: accountData.name ?? facebookData.name,
        email: facebookData.email,
        facebookId: facebookData.facebookId
      })
    }
    return new AuthenticationError()
  }
}
// export class FacebookAuthentcationUseCase {
//   constructor(
//     private readonly loadFacebookUserApi: ILoadFacebookUserApi,
//     private readonly loadUserAccountRepository: ILoadUserAccountRepository,
//     private readonly createFacebookAccountRepository: ICreateFacebookAccountRepository,
//     private readonly updateWithFacebookRepository: IUpdateFacebookAccountRepository
//   ) { }

//   async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
//     const facebookData = await this.loadFacebookUserApi.loadUser(params)
//     if (facebookData !== undefined) {
//       const accountData = await this.loadUserAccountRepository.load({ email: facebookData.email })
//       if (accountData?.name !== undefined) {
//         await this.updateWithFacebookRepository.updateWithFacebook({
//           id: accountData.id,
//           name: accountData.name,
//           facebookId: facebookData.facebookId

//         })
//       } else {
//         await this.createFacebookAccountRepository.createFromFacebook(facebookData)
//       }
//     }

//     return new AuthenticationError()
//   }
// }
