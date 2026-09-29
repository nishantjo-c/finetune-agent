import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { ConversationArea } from './uicomponents/conversationArea.jsx'
import store from './configureStore.js'
import { ErrorBoundary } from './fallbacks/fallback1.jsx'
import { createBrowserRouter, data } from "react-router";
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/:id",
    loader: async ({params}) => {
      return { id: params.id }
    },
    Component: ConversationArea
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ErrorBoundary fallback={<p>Kuch dikkat h bhai!</p>}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
)
