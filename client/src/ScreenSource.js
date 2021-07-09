import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav'
import {useSelector, useDispatch} from 'react-redux'

function ScreenSource() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const [sourceList, setSourceList] = useState([]);

  const loadSources = async (language, country) => {
    if(language && country){
      const request = await fetch(`/users/change-language/${user.token}`, {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({
          language: language,
          country: country
        })
      })
      const response = await request.json()
      dispatch({
        type: "saveUser",
        user: response.user
      })
      console.log(`response`, response)
    }

    const request = await fetch(`/load-sources/${user.token}`)
    const response = await request.json()
    console.log(`response`, response)
    setSourceList(response.sources)
  }

  useEffect(()=>{
    loadSources()
  }, [])

  const pngCatogries = ["business", "general", "sports"]

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
         <img className={user.language === "fr" ? "active" : ""} style={{height: "60px", margin: "0 5px"}} onClick={()=> loadSources('fr', 'fr')} src="/images/fr.png" alt="frenchSources" />
         <img className={user.language === "en" ? "active" : ""} style={{height: "60px", margin: "0 5px"}} onClick={()=> loadSources('en', 'gb')} src="/images/uk.png" alt="englishSources" />
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${pngCatogries.includes(item.category) ? item.category : "banner" }.png`} />}
                        title={<Link to={`/articles/${item.id}`}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

export default ScreenSource;
