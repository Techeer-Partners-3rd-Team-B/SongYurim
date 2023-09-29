import React from "react";
import styled, {css} from "styled-components";

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'entertainment',
        text: '연예'
    },
    {
        name: 'sports',
        text: '스포츠'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'technology',
        text: '기술'
    }
]

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 100vw;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

const Category = styled.div`
    font-size: 1.25rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover{
        color: #495057;
    }

    ${props => 
        props.active && css`
            font-weight: 600;
            border-bottom: 2px solid #22b8cf;
            color: #22b8cf;
            &: hover {
                color: #3bc9db;
            }
        `}

    & + & {
        margin-left:1rem;
    }
`

function Categories({onSelect, category}){
    return(
        <CategoriesBlock>
            {categories.map(v => (
                <Category
                    key={v.name}
                    active={category === v.name}
                    onClick={()=> onSelect(v.name)}
                    >
                    {v.text}
                </Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;