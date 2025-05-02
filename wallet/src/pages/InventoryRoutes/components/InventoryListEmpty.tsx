import { Link } from 'react-router'
import { TokenListItemEmpty, TokenTileEmpty } from './TokenTileEmpty'
import { Button } from '@0xsequence/design-system'
import { ROUTES } from '../../../routes'
import { THEME } from '../../../utils/theme'

export function InventoryGridEmpty({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <TokenTileEmpty />
      <TokenTileEmpty />
      <TokenTileEmpty className="hidden sm:block" />
      <TokenTileEmpty className="hidden sm:block" />
      <TokenTileEmpty className="hidden sm:block" />
      {isLoading ? (
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

export function InventoryListEmpty({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <TokenListItemEmpty />
      <TokenListItemEmpty />
      <TokenListItemEmpty />

      {isLoading ? null : (
        <div className="col-span-4 py-12 sm:col-span-2 flex flex-col items-center justify-center px-8 sm:py-4 text-center gap-1">
          <span className="font-bold text-style-normal ">You have no items</span>
          <p className="font-bold text-style-sm text-seq-grey-500">{THEME.inventory.empty}</p>
          <Button asChild variant="glass" size="sm" className="mt-2">
            <Link to={ROUTES.DISCOVER}>Discover</Link>
          </Button>
        </div>
      )}
      <TokenListItemEmpty />
      <TokenListItemEmpty />
      <TokenListItemEmpty />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-8">
        <TokenTileEmpty />
        <TokenTileEmpty />
        <TokenTileEmpty />
        <TokenTileEmpty />
        <TokenTileEmpty />
        <TokenTileEmpty />
        <TokenTileEmpty />
        <TokenTileEmpty />
      </div>
    </>
  )
}
