import { Button, CopyIcon, Image, ShareIcon, Text, nativeTokenImageUrl } from '@0xsequence/design-system'
import { ChainId, networks } from '@0xsequence/network'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useAuth } from '../context/AuthContext'

export const Receive = ({ chainId }: { chainId: ChainId }) => {
  const { address = '' } = useAuth()
  const [isCopied, setCopied] = useState<boolean>(false)

  const nativeTokenInfo = networks[chainId].nativeToken

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setCopied(false)
      }, 4000)
    }
  }, [isCopied])

  const onClickCopy = () => {
    setCopied(true)
  }

  const onClickShare = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://twitter.com/intent/tweet?text=Here%20is%20my%20address%20${address}`)
    }
  }

  return (
    <div>
      <div className="p-5 pt-3 flex flex-col justify-center items-center gap-4">
        <div className="mt-1 w-fit bg-white rounded-md flex items-center justify-center p-4">
          <QRCodeCanvas
            value={address || ''}
            size={200}
            bgColor="white"
            fgColor="black"
            data-id="receiveQR"
          />
        </div>
        <div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Text
              variant="medium"
              color="black"
              textAlign="center"
              lineHeight="inherit"
              style={{ fontWeight: '700' }}
            >
              My Wallet
            </Text>
            <Image width="5" src={nativeTokenImageUrl(chainId)} alt="icon" />
          </div>
          <div className="mt-2" style={{ maxWidth: '180px', textAlign: 'center' }}>
            <Text
              textAlign="center"
              color="black"
              style={{
                fontSize: '14px',
                maxWidth: '180px',
                overflowWrap: 'anywhere'
              }}
            >
              {address}
            </Text>
          </div>
        </div>
        <div className="gap-3 flex">
          <CopyToClipboard text={address || ''}>
            <Button
              className="bg-black"
              onClick={onClickCopy}
              leftIcon={CopyIcon}
              label={isCopied ? 'Copied!' : 'Copy'}
            />
          </CopyToClipboard>
          <Button className="bg-black" onClick={onClickShare} leftIcon={ShareIcon} label="Share" />
        </div>
      </div>
    </div>
  )
}
