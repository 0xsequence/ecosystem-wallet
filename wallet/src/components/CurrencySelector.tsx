import { localStore } from '../utils/local-store'

export function CurrencySelector() {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    localStore.set('userPrefs', { currency: e.target.value })
  }

  return (
    <div className="text-xs bg-button-glass/50 pl-1 py-0.25 rounded-xs self-start inline-flex">
      <select onChange={handleChange}>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
        <option value="BTC">BTC (Bitcoin)</option>
      </select>
    </div>
  )
}
