export const simulateTransaction = async (tx: any): Promise<Record<string, any> | null> => {
  const TENDERLY_ACCOUNT_SLUG = import.meta.env.VITE_TENDERLY_ACCOUNT_SLUG
  const TENDERLY_PROJECT_SLUG = import.meta.env.VITE_TENDERLY_PROJECT_SLUG
  const TENDERLY_ACCESS_TOKEN = import.meta.env.VITE_TENDERLY_ACCESS_TOKEN

  if (!TENDERLY_ACCOUNT_SLUG || !TENDERLY_PROJECT_SLUG || !TENDERLY_ACCESS_TOKEN) {
    throw new Error('Tenderly credentials are not set up correctly.')
  }

  const txPayload: any = {
    ...tx,
    save: true,
    save_if_fails: true,
    simulation_type: 'full',
    network_id: tx.chainId.toString(),
    gas: parseInt(tx.gas as string, 16) || null,
    gas_price: parseInt(tx.gasPrice as string, 16) || null,
    value: parseInt(tx.value, 16) || null,
    input: tx.data
  }

  try {
    const response = await fetch(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT_SLUG}/project/${TENDERLY_PROJECT_SLUG}/simulate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': TENDERLY_ACCESS_TOKEN as string
        },
        body: JSON.stringify(txPayload)
      }
    )

    return await response.json()
  } catch (e) {
    console.error({ e })
    return null
  }
}
