import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { mongoConnect } from '../utils/dbConnect'
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App({ Component, pageProps }: AppProps) {
  mongoConnect()
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {()=> (
       <Component {...pageProps} />
      )}
    </PersistGate>
  </Provider>
  )
}
