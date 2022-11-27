import './App.css';
import HOME from './Components/Pages/homepage';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <div className="App">
      <ToastProvider placement="top-center">
        <HOME />
      </ToastProvider>
    </div>
  );
}

export default App;
