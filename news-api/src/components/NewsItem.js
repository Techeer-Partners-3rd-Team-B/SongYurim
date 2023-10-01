import styled from "styled-components";

const NewsItemBlock = styled.div`
    display: flex;
    .thumbnail{
        img{
            margin-right: 1rem;
            width: 160px;
            height: 160px;
            object-fit: cover;
        }
    }
    .contents{
        h2{
            margin: 0;
            a {
                color: block;
            }
        }

        p{
            margin: 0;
            line-height: 1.5;
            margin-top:0.5rem;
            white-space: normal;
        }
    }
    &+&{
        margin-top: 3rem;
    }

`;

function NewsItem({article}){
    const {title, description, url, urlToImage} = article;
    //구조 분해를 이용해서 article.title → title로 할당하기

    return(
        <NewsItemBlock>
            {/* 썸네일 요소 생성 */}
            {urlToImage && (
                <div className="thumbnail">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumbnail"/>

                    </a>
                </div>
            )}
            {/* 컨텐츠 영역 */}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>

        </NewsItemBlock>
    );
};

export default NewsItem;