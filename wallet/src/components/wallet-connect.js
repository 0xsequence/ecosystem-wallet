import { WalletConnect } from '../components/WalletConnect'
import { walletConnectStore } from '../store/WalletConnectStore'
import { useSnapshot } from 'valtio'

const { sessions } = useSnapshot(walletConnectStore.state)
const activeWcSessions = sessions.filter(s => s.expiry * 1000 > Date.now())
{
  /* <div className="flex flex-col gap-2 items-center justify-center w-full">
        {!transactionRequest && !connectionRequest && !signRequest && (
          <div className="w-full" style={{ maxWidth: '400px' }}>
            <Collapsible
              label={
                <div className="flex flex-col items-start justify-center gap-2" style={{ width: '400px' }}>
                  <Text color="text100">WalletConnect</Text>
                  {activeWcSessions.length > 0 && (
                    <span className="text-white text-style-sm">
                      {activeWcSessions.length} Active Connection{activeWcSessions.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              }
            >
              <WalletConnect />
            </Collapsible>
          </div>
        )}
      </div> */
}
