import { React, useCallback, useState } from 'react';
import './App.css';
import Categories from './components/Categories';
import NewsList from './components/NewsList';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import NewsPage from './pages/NewsPage';

function App(){
  // const [category, setCategory] = useState('all')
  // //onSelect 함수를 통해 category 값이 업데이트
  // const onSelect = useCallback(Category => setCategory(Category), [])
  return(
    <Route path = "/:category?" component={NewsPage}/>
  );
}

export default App;
