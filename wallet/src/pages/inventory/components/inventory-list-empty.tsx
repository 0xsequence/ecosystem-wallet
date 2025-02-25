import { Link } from 'react-router'
import { TokenTileEmpty } from './token-tile-empty'
import { Button } from '@0xsequence/design-system'
import { ROUTES } from '../../../routes'
import { useInventory } from '../helpers/use-inventory'

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
          <p className="font-bold text-style-sm text-seq-grey-500">
            Discover the apps and games of Soneium and grow your collection
          </p>
          <Button asChild size="sm" className="mt-2 bg-black">
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
