import { GridIcon, ListIcon } from '../../../design-system-patch/icons'
import { useLocalStore } from '../../../utils/local-store'
import { UserPreferenceLocalStore } from '../types'

export function InventoryDisplayModeSwitch() {
  const [prefs, setPrefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const displayMode = prefs?.inventoryDisplayMode || 'grid'

  return (
    <fieldset>
      <legend className="sr-only">Change display mode for inventory</legend>
      <div className="flex h-full p-1 rounded-md bg-button-glass flex-1 overflow-clip">
        <label className="has-checked:bg-button-glass rounded-sm p-3 flex items-center justify-center cursor-pointer  relative">
          <input
            type="radio"
            value="grid"
            name="displayMode"
            checked={displayMode === 'grid'}
            className="size-full inset-0 absolute appearance-none cursor-pointer"
            onChange={() => setPrefs({ inventoryDisplayMode: 'grid' })}
          />
          <GridIcon className="size-4" />
          <span className="sr-only">Grid</span>
        </label>
        <label className="has-checked:bg-button-glass rounded-sm p-3 flex items-center justify-center cursor-pointer relative">
          <ListIcon className="size-4" />
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
