import { React, useCallback, useState } from 'react';
import './App.css';
import Categories from './components/Categories';
import NewsList from './components/NewsList';

function App(){
  const [category, setCategory] = useState('all')
  //onSelect 함수를 통해 category 값이 업데이트
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
