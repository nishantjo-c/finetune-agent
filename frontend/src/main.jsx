import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './configureStore.js'
import { ErrorBoundary } from './fallbacks/fallback1.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ErrorBoundary fallback={<p>Kuch dikkat h bhai!</p>}>
        <App />
      </ErrorBoundary>
    </Provider>
)
