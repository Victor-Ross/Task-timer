import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { Header } from './components/Header';
import { CyclesContextProvider } from './contexts/CyclesContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesContextProvider>
    </ThemeProvider>
  );
}
