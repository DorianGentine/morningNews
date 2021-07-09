import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './Nav'
import { useParams } from 'react-router';
import MyCard from './components/MyCard';

function ScreenArticlesBySource() {
  const {id} = useParams()

  const [articleList, setArticleList] = useState([])
  useEffect(()=>{
    const loadArticles = async () => {
      const request = await fetch(`/load-article?id=${id}`)
      const response = await request.json()
      console.log(`response`, response)
      setArticleList(response.articles)
    }
    loadArticles()
  }, [id])

  const cardList = []
  for (let i = 0; i < articleList.length; i++) {
    const item = articleList[i];
    cardList.push(
      <MyCard i={i} item={item} key={i} />
    )
  }

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <div className="Card">
        <div  style={{display:'flex',justifyContent:'center', flexWrap: "wrap"}}>
          {cardList}
        </div>
      </div> 
    </div>
  );
}

export default ScreenArticlesBySource;