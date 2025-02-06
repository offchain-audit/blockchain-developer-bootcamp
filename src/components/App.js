import { useEffect } from 'react';
import { ethers } from 'ethers';
import TOKEN_ABI from '../abis/Token.json';
import config from '../config.json';
import { AbiCoder, isAddress } from 'ethers/lib/utils';
import store from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';

function App() {

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);

          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get accounts
          const accounts = await web3.eth.getAccounts();
          console.log('Connected accounts:', accounts);
      } else {
          // Notify the user to install MetaMask
          alert('MetaMask is not installed. Please install it to use this DApp: https://metamask.io/');
      }
  } catch (error) {
      console.error('Error loading blockchain data:', error);
  }    
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    console.log(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch({ type: 'PROVIDER_LOADED', connection: provider })
    const { chainId } = await provider.getNetwork()
    console.log(chainId)

    const token = new ethers.Contract(config[chainId].Dapp.address, TOKEN_ABI, provider)
    console.log(token.address)

    const symbol = await token.symbol()
    console.log(symbol)
  }

  useEffect(() => {
    loadBlockchainData()

  })

  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;
