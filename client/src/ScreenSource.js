import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav'

function ScreenSource() {

  const [sourceList, setSourceList] = useState([]);

  const loadSources = async (language = "fr", country = "fr") => {
    const myHeaders = new Headers({
      "Authorization": "b77cb7e8bf4d45c79fc3f0286d06822a",
    });
    const request = await fetch(`https://newsapi.org/v2/sources?language=${language}&country=${country}`, {
      headers: myHeaders
    })
    const response = await request.json()
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
         <img style={{height: "60px", margin: "0 5px"}} onClick={()=> loadSources()} src="/images/fr.png" alt="frenchSources" />
         <img style={{height: "60px", margin: "0 5px"}} onClick={()=> loadSources('en', 'gb')} src="/images/uk.png" alt="englishSources" />
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
