import { CarDTO } from "../dtos/CarDTO"

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined
      SignIn: undefined
      SignUpFirstStep: undefined
      SignUpSecondStep: {
        user: { name: string; email: string; driverLicense: string }
      }
      Home: undefined
      MyCars: undefined
      CarDetails: { car: CarDTO }
      Scheduling: { car: CarDTO }
      SchedulingDetails: { car: CarDTO; dates: string[] }
      Confirmation: {
        title: string
        message: string
        nextScreen: string
      }
    }
  }
}
