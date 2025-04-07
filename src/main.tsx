import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Amplify} from "aws-amplify";
import config from "./amplifyconfiguration.json"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from './context/AppContext.tsx';

const queryClient = new QueryClient();
Amplify.configure(config);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
)
