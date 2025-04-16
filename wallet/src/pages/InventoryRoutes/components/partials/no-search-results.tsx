export function NoSearchResults({ term, clear }: { term?: string | null; clear: () => void }) {
  return (
    <div className="text-center text-primary bg-background-muted w-full px-4 max-sm:py-12 sm:aspect-video rounded-lg flex items-center justify-center flex-col pointer-events-auto gap-4">
      <span>No results found for "{term}"</span>
      <button
        type="button"
        className="cursor-pointer hover:opacity-80 focus:opacity-80 bg-button-glass px-3 py-1 rounded-sm text-sm font-medium textfit-body"
        onClick={() => clear()}
      >
        Clear
      </button>
    </div>
  )
}
