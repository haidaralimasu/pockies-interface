import React, { useEffect } from 'react'
import { Minter } from './components'
import { supportedChainId } from './config'
import { useEthers } from '@usedapp/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { chainId, switchNetwork } = useEthers()

  useEffect(() => {
    if (chainId !== supportedChainId) {
      switchNetwork(supportedChainId)
    }
  }, [chainId])

  return (
    <div>
      <ToastContainer style={{ backgroundColor: 'black' }} />
      <Minter />
    </div>
  )
}

export default App
