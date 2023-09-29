import styled from "styled-components";
import NewsItem from "./NewsItem";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        wdith: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;


function NewsList({category}) {
    const [articles, setArticle ] = useState(null);
    const [loading, setLoading ] = useState(null);
    
    useEffect(()=>{
        // API 호출 실패 예외처리를 선언하고 호출시간동안 보여줄 로딩 영역을 설정
        
        const fetchData = async()=>{
            setLoading(true)

            try{
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=afda249a1ccb482fa0944d12a295021b',
                );
                setArticle(response.data.articles)
            } catch(e) {
                console.log(e)
            }
            setLoading(false)
        };
        fetchData();
    }, []);

    if(loading) {
        return <NewsItemBlock>대기 중입니다...</NewsItemBlock>
    }

    if (!articles) {
        return null;
    }

    return(
        <NewsItemBlock>
            {articles.map(v => (
                <NewsItem key={v.url} article={v}/>
            ))}
        </NewsItemBlock>
    );
};

export default NewsList;