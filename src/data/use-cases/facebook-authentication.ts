import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ILoadUserAccountRepository, ICreateFacebookAccountRepository, IUpdateFacebookAccountRepository } from '@/data/contracts/repositories'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/use-cases'

export class FacebookAuthentcationUseCase {
  constructor(
    private readonly facebookApi: ILoadFacebookUserApi,
    private readonly userAccountRepository: ILoadUserAccountRepository & ICreateFacebookAccountRepository & IUpdateFacebookAccountRepository
  ) { }

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.facebookApi.loadUser(params)

    if (facebookData !== undefined) {
      const accountData = await this.userAccountRepository.load({ email: facebookData.email })

      if (accountData?.name !== undefined) {
        await this.userAccountRepository.updateWithFacebook({
          id: accountData.id,
          name: accountData.name,
          facebookId: facebookData.facebookId
        })
      } else {
        await this.userAccountRepository.createFromFacebook(facebookData)
      }
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

// #################################################################################
// INTERSECTION TYPES
// -------> OUTRO METODO DE ESCREVER O CODIGO ACIMA
