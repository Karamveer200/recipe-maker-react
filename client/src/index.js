import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LocalStorageContextComponent from './context/LocalStorageContext';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalStorageContextComponent>
          <App />
        </LocalStorageContextComponent>
      </QueryClientProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
