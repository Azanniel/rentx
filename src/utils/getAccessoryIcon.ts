import { SvgProps } from "react-native-svg"

import SpeedSvg from "../assets/speed.svg"
import AccelerationSvg from "../assets/acceleration.svg"
import ForceSvg from "../assets/force.svg"
import GasolineSvg from "../assets/gasoline.svg"
import EnergySvg from "../assets/energy.svg"
import HybridSvg from "../assets/hybrid.svg"
import ExchangeSvg from "../assets/exchange.svg"
import PeopleSvg from "../assets/people.svg"
import CarSvg from "../assets/car.svg"

const icons: { [key: string]: React.FC<SvgProps> } = {
  speed: SpeedSvg,
  acceleration: AccelerationSvg,
  turning_diameter: ForceSvg,
  gasoline_motor: GasolineSvg,
  electric_motor: EnergySvg,
  hybrid_motor: HybridSvg,
  exchange: ExchangeSvg,
  seats: PeopleSvg,
}

export function getAccessoryIcon(type: string) {
  return icons[type] || CarSvg
}
