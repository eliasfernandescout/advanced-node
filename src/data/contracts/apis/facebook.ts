export interface ILoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>

}

export interface ILoadUserByEmailRepository {
  loadUserByEmail: (email: string) => Promise<void>
}
export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined | {
    facebookId: string
    email: string
    name: string
  }
}
