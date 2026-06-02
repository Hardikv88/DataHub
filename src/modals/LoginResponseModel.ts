// export type LoginResponseModel = {
//   id: number
//   username: string
//   email: string
//   firstName: string
//   lastName: string
//   gender: string
//   image: string
//   token: string
//   refreshToken: string
// }

export type LoginResponseModel = {
  success: boolean
  message: string
  data: {
    token: string
    user: {
      userId: number
      userName: string
      userEmail: string
      userRole: string
      created_at: string
      updated_at: string
    }
  }
}