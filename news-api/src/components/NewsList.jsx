import React from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

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
    const [loading, response, error] = usePromise(()=> {
        // props로 넘어온 state로
        const query = category === 'all'? '':`&category=${category}`
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=fcda2c44c28f4c74b36a4f2944aa8fa6`,
        );
    }, [category])

    if(loading) {
        return <NewsItemBlock>대기 중입니다...</NewsItemBlock>
    }
    // articles 값이 설정 안될경우 (null 오류방지)
    if (!response) {
        return null;
    }

    if (error) {
        return <NewsItemBlock>에러 발생</NewsItemBlock>
    }

    const {articles} = response.data;

    return(
        <NewsItemBlock>
            {/* articles 데이터를 매핑하고, 각 기사를 NewsItem 컴포넌트로 변환하여 렌더링하는 역할 */}
            {articles.map(v => (
                <NewsItem key={v.url} article={v}/>
            ))}
        </NewsItemBlock>
    );
};

export default React.memo(NewsList);