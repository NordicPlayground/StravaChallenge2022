import { App } from 'app/App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
			<App />
)
