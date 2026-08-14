import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Simple entry point — App handles routing and auth context
createRoot(document.getElementById('root')).render(<App />);