import { CarDTO } from "../dtos/CarDTO";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined;
      SignIn: undefined;
      Home: undefined;
      MyCars: undefined;
      CarDetails: { car: CarDTO };
      Scheduling: { car: CarDTO };
      SchedulingDetails: { car: CarDTO, dates: string[] };
      SchedulingComplete: undefined;
    }
  }
}