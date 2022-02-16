export interface ITokenGenerator {
  generateToken: (params: NTokenGenerator.Params) => Promise<void>
}

export namespace NTokenGenerator {
  export type Params = {
    key: string
  }
}
