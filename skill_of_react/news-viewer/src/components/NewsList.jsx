//API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환해 렌더링해줄 컴포넌트
import { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from 'axios';

const NewListBlock = styled.div`
    box-sizing:border-box;
    padding-bottom:3rem;
    width:768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width:768px;){
        width:100%;
        padding-left:1rem;
        padding-right:1rem;
    }
`;

const sampleArticle={
    title:"제목",
    description:"내용",
    url:"http://google.com",
    urlToImage:"http://via.placeholder.com/160"
};

const NewsList = () =>{
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        //async를 이 안에서 사용하고 싶다면 함수를 따로 선언해야 한다
        const fetchData = async () =>{
            setLoading(true);
            try{
                const response = await axios.get("https://newsapi.org/v2/top-headlines?country=kr&apiKey=6eaf4432507b411f81ada3c743c06a38");
                setArticles(response.data.articles);
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData()
    }, []);

    //아직 대기 중일 때
    if(loading){
        return <NewListBlock>대기중...</NewListBlock>;
    }

    //아직 article 값이 설정되지 않았을 때
    if(!articles){
        return null;
    }

    //article 값이 유효할 때
    return(
        <NewListBlock>
            {articles.map(article =>(
                <NewsItem key={article.url} article={article}></NewsItem>
            ))}
        </NewListBlock>
    );
}

export default NewsList;
