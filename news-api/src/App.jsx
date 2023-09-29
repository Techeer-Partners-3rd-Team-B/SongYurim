import { React, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = ()=>{
  // API를 넘겨받을 state 선언
  // 상태 값을 저장하는 변수, 상태를 업데이트하는 함수
  const [data1, setData] = useState(null);

  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&apiKey=afda249a1ccb482fa0944d12a295021b',
      );
      //response.data의 데이터가 data1로 저장
      setData(response.data);
    } catch(e){
      console.log(e)
    }
  };

  return(
    <div>
      <div>
        <button onClick={()=>onClick()}>불러오기</button>
      </div>
      {data1 && <textarea rows={7} value={JSON.stringify(data1, null, 2)} readOnly={true}/> }
    </div>
  )
}

export default App;
