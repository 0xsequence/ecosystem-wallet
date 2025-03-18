import { GridIcon, ListIcon } from '../../../design-system-patch/icons'
import { useLocalStore } from '../../../utils/local-store'
import { UserPreferenceLocalStore } from '../types'

export function InventoryDisplayModeSwitch() {
  const [prefs, setPrefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const displayMode = prefs?.inventoryDisplayMode || 'grid'

  return (
    <fieldset>
      <legend className="sr-only">Change display mode for inventory</legend>
      <div className="inline-flex p-1 rounded-md bg-button-glass">
        <label className="relative has-checked:bg-button-glass rounded-sm w-10 h-7 p-1 flex items-center justify-center cursor-pointer">
          <input
            type="radio"
            value="grid"
            name="displayMode"
            checked={displayMode === 'grid'}
            className="size-full inset-0 absolute appearance-none cursor-pointer"
            onChange={() => setPrefs({ inventoryDisplayMode: 'grid' })}
          />
          <GridIcon />
          <span className="sr-only">Grid</span>
        </label>
        <label className="relative has-checked:bg-button-glass rounded-sm w-10 h-7 p-1 flex items-center justify-center cursor-pointer">
          <ListIcon />
          <input
            type="radio"
            value="grid"
            name="displayMode"
            checked={displayMode === 'list'}
            className="size-full inset-0 absolute appearance-none  cursor-pointer"
            onChange={() => setPrefs({ inventoryDisplayMode: 'list' })}
          />
          <span className="sr-only">List</span>
        </label>
      </div>
    </fieldset>
  )
}
