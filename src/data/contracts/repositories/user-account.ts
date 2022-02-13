export interface ILoadUserRepository {
  load: (params: NLoadUserAccountRepository.Params) => Promise<NLoadUserAccountRepository.Result>

}
export namespace NLoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined
}

export interface ICreateFacebookAccountRepository {
  createFromFacebook: (params: NCreateFacebookAccountRepository.Params) => Promise<void>

}
export namespace NCreateFacebookAccountRepository {
  export type Params = {
    email: string
    name: string
    facebookId: string
  }
}
