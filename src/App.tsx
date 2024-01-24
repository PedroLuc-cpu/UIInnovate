import { AppMenuLateralProvider } from './contexts/AppMenuLateralContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoute } from './routes'

function App() {
  return (
    <Router>
      <AppMenuLateralProvider>
        <AppRoute />
      </AppMenuLateralProvider>
    </Router>
  )
}

export default App
