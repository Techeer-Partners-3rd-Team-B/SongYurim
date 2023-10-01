//기본 API 상태를 관리해줄 파일, promise 문을 사용하여 유틸 프로세스를 함수로 만들어서 재사용

import { useEffect } from "react";
import { useState } from "react";

export default function usePromise(promiseCreator, deps){
    // 대기 중, 완료, 실패 상태 관리
    const [loading, setLoding] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const process = async() => {
            setLoding(true);
            try{
                const resolved = await promiseCreator();
                setResolved(resolved)
            } catch(e){
                setError(e);
            }
            setLoding(false);
        };
        process();
    }, deps);

    return [loading, resolved, error];
}