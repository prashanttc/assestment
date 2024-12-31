import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

function App() {


  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ListPage/>}/>
      <Route path='/details/:id' element={<DetailPage/>}/>
    </Routes>
    </BrowserRouter>
   </div>
  )
}
export default App
