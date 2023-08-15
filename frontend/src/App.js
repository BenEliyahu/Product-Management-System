import { useState } from 'react';
import LeftNav from './components/LeftNav/LeftNav';
import MainSection from './components/MainSection/MainSection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [productId, setProductId] = useState('')
  console.log(productId)
  return (
    <div className="App">
      <LeftNav productId={productId}/>
      <MainSection setProductId={setProductId}/>
      <ToastContainer />
    </div>
  );
}

export default App;
