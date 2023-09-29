import { React, useCallback, useState } from 'react';
import './App.css';
import Categories from './components/Categories';
import NewsList from './components/NewsList';

function App(){
  const [category, setCategory] = useState('all')
  const onSelect = useCallback(Category => setCategory(Category), [])
  return(
    <>
    {/* props로 카테고리 state와 함수를 넘겨줌 */}
      <Categories category={category} onSelect={onSelect}/>
      <NewsList category={category}/>
    </>
  );
}

export default App;
