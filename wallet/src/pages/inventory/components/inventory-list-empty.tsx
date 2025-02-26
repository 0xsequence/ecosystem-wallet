import { Link } from 'react-router'
import { TokenTileEmpty } from './token-tile-empty'
import { Button } from '@0xsequence/design-system'
import { ROUTES } from '../../../routes'
import { useInventory } from '../helpers/use-inventory'
import { THEME } from '../../../utils/theme'

export function InventoryListEmpty() {
  const { status } = useInventory()

  return (
    <>
      <TokenTileEmpty />
      <TokenTileEmpty />
      <TokenTileEmpty className="hidden sm:block" />
      <TokenTileEmpty className="hidden sm:block" />
      <TokenTileEmpty className="hidden sm:block" />
      {status.isLoading ? (
        <>
          <TokenTileEmpty className="hidden sm:block" />
          <TokenTileEmpty className="hidden sm:block" />
        </>
      ) : (
        <div className="col-span-4 py-12 sm:col-span-2 flex flex-col items-center justify-center px-8 sm:py-4 text-center gap-1">
          <span className="font-bold text-style-normal ">You have no items</span>
          <p className="font-bold text-style-sm text-seq-grey-500">{THEME.inventory.empty}</p>
          <Button asChild variant="glass" size="sm" className="mt-2">
            <Link to={ROUTES.DISCOVER}>Discover</Link>
          </Button>
        </div>
      )}
      <TokenTileEmpty />
      <TokenTileEmpty />
      <TokenTileEmpty className="hidden sm:block" />
      <TokenTileEmpty className="hidden sm:block" />
      <TokenTileEmpty className="hidden sm:block" />
    </>
  )
}
