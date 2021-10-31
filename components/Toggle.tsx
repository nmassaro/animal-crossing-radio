import { Switch } from '@headlessui/react'
import { classNames } from '@utils/classNames'

type ToggleProps = {
  enabled: boolean
  setEnabled: (isEnabled: boolean) => void
  label: string
}

export const Toggle = ({ enabled, setEnabled, label }: ToggleProps) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(enabled ? 'bg-purple-600' : 'bg-gray-400',
        'relative inline-flex items-center h-6 rounded-full w-11 transition-all ease-in-out')}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform ease-in-out`}
      />
    </Switch>
  )
}