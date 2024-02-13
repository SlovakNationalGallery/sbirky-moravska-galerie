import { ControlsSymbol } from '~/plugins/controls'

export const useControls = () => {
  return inject(ControlsSymbol)!
}
