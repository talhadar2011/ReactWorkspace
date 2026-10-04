export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  phone: string
  address: {
    address: string
  }
  country: string

}