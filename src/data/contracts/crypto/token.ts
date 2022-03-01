export interface ITokenGenerator {
  generateToken: (params: NTokenGenerator.Params) => Promise<NTokenGenerator.Result>
}

export namespace NTokenGenerator {
  export type Params = {
    key: string
    expirationInMs: number
  }

  export type Result = string
}
