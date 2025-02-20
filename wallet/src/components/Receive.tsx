import { Button, CopyIcon, ShareIcon, Text } from '@0xsequence/design-system'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useAuth } from '../context/AuthContext'

export const Receive = () => {
  const { address = '' } = useAuth()
  const [isCopied, setCopied] = useState<boolean>(false)


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
