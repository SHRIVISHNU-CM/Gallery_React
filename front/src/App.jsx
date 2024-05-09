
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Card from './Card';
import View from "./View";

function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Card/>}/>
          <Route path='/:id' element={<View/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

