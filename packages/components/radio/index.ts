import _Radio from './src/radio.vue'
import _RadioGroup from './src/radio-group.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Radio = withInstall(_Radio)
const RadioGroup = withInstall(_RadioGroup)

export default Radio
export { Radio, RadioGroup }
export * from './src/radio'
export * from './src/radio-group'

declare module 'vue' {
  export interface GlobalComponents {
    ZRadio: typeof Radio
    ZRadioGroup: typeof RadioGroup
  }
}

