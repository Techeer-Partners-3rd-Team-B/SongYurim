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
    
    // API 호출 실패 예외처리, 로딩 영역을 설정
    useEffect(()=>{   

        const fetchData = async()=>{
            setLoading(true)

            try{
                // props로 넘어온 state로
                const query = category === 'all'? '':`&category=${category}`
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=fcda2c44c28f4c74b36a4f2944aa8fa6`,
                );
                setArticle(response.data.articles)
            } catch(e) {
                console.log(e)
            }
            setLoading(false)
        };
        fetchData();
    }, [category]);

    if(loading) {
        return <NewsItemBlock>대기 중입니다...</NewsItemBlock>
    }
    // articles 값이 설정 안될경우 (null 오류방지)
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