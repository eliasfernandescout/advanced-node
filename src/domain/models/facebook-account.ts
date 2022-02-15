type FacebookModel = {
  name: string
  email: string
  facebookId: string
}

type AccountModel = {
  id?: string
  name?: string
}

export class FacebookAccount {
  id?: string
  name: string
  email: string
  facebookId: string

  constructor(facebookData: FacebookModel, accountData?: AccountModel) {
    this.id = accountData.id
    this.name = accountData?.name ?? facebookData.name
    this.email = facebookData.email
    this.facebookId = facebookData.facebookId
  }

  // updateWithFacebook(model: { name: string, email: string, facebookId: string }): void {
  //   this.email = model.email
  //   this.facebookId = model.facebookId
  //   this.name = this.name ?? model.name
  // }
}
