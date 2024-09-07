import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalLayout from './_layout/GlobalProvider'
import MainLayout from './main/_layout/layout'
import FlowChartPage from './main/flow-chart/page'
import MindPage from './main/mind/page'
import WelcomePage from './main/welcome/page'

const route = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <WelcomePage />,
          },
          {
            path: 'flow-chart',
            element: <FlowChartPage />,
          },
          {
            path: 'mind',
            element: <MindPage />,
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={route}>
    </RouterProvider>
  )
}

export default App
