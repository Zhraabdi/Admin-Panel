import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.jsx';
import { UIProvider } from './context/UIContext.jsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <AuthProvider>
  <UIProvider>
  <App />
  </UIProvider>
  </AuthProvider>
  </BrowserRouter>
  </QueryClientProvider>
  </StrictMode>,
)
