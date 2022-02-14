export interface ILoadUserAccountRepository {
  load: (params: NLoadUserAccountRepository.Params) => Promise<NLoadUserAccountRepository.Result>

}
export namespace NLoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}
// ----------------------------------------------------------------------------------------
export interface ISaveFacebookAccountRepository {
  saveWithFacebook: (params: NSaveFacebookAccountRepository.Params) => Promise<void>

}
export namespace NSaveFacebookAccountRepository {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
}

// ----------------------------------------------------------------------------------------
// export interface IUpdateFacebookAccountRepository {
//   updateWithFacebook: (params: NUpdateFacebookAccountRepository.Params) => Promise<void>

// }
// export namespace NUpdateFacebookAccountRepository {
//   export type Params = {
//     id: string
//     name: string
//     facebookId: string
//   }
// }
