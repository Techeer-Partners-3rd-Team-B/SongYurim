import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";


export interface ITweet {
    id:string;
    photo?:string;
    tweet:string;
    userId:string;
    username:string;
    createdAt:number;
}

const Wrapper = styled.div``;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]);

    const fetchTweets = async() => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt","desc")
        );
        const snapshot = await getDocs(tweetsQuery);

        const tweets = snapshot.docs.map((doc)=>{
            //map으로 반환된 각 배열을 불러와서
            const {tweet, createdAt, userId, username, photo} = doc.data();
            //아래와 같은 형식으로 데이터를 반환
            return {
                id: doc.id, 
                tweet, 
                createdAt, 
                userId, 
                username, 
                photo,
            };
        });
        setTweet(tweets);
    };
    useEffect(()=>{
        fetchTweets();
    },[]) 

    return (
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet}/>
            ))}
        </Wrapper>
    );
}