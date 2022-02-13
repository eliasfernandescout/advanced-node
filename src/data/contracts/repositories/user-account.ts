export interface ILoadUserRepository {
  load: (params: NLoadUserByEmailRepository.Params) => Promise<void>

}
export namespace NLoadUserByEmailRepository {
  export type Params = {
    email: string
  }
}
