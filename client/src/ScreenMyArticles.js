import React, {useState , useEffect} from 'react';
import './App.css';
import { Card, Icon, Empty, Modal, Button } from 'antd';
import Nav from './Nav'
import { useSelector, useDispatch} from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles() {
  //const articleWishlist = useSelector(state => state.articleWishlist)
  const [articleWishlist , setArticleWishlist] = useState([])
  const user = useSelector(state=>state.user)
  useEffect(()=>{
    async function articleBd(){
      const request = await fetch (`/my-articles/${user.token}`)
      const response = await request.json()
      console.log(response); 
      setArticleWishlist(response.articles)
    } 
    articleBd();
  }, [] )
  
  const dispatch = useDispatch()

const deleteArticle = async (article) => {
    const request = await fetch(`/delete/${user.token}/${article.title}`, {method:'DELETE'})
    const response = await request.json()
    console.log(response);
    setArticleWishlist(response.articles)
    dispatch({
      type: "deleteToWishList", 
      title: article.title
    });
  }
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalArticle, setModalArticle] = useState({})
  const showModal = article => {
    setModalArticle(article)
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const [language, setLanguage] = useState('');

  const renderArticles = articleWishlist.map( (article, index) => {
    if(language === '' || language.includes(article.language)){
      return (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            style={{
              width: 300,
              margin: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            cover={
              <img
                alt="example"
                src={article.urlToImage}
              />

            }
            actions={[
              <Icon type="read" key="ellipsis2" onClick={() => showModal(article)} />,
              <Icon type="delete" key="ellipsis" onClick={() => deleteArticle(article)}/>
            ]}
          >
            <Meta
              title={article.title}
              description={article.description}
            />
          </Card>
        </div>
      )  
    } 
  })

  

  return (
    <div>
      <Nav />
      <div className="Banner">
        <img className={language === "" ? "active" : ""} style={{height: "60px", margin: "0 5px"}} onClick={()=> setLanguage("")} src="/images/banner.png" alt="frenchSources" />
        <img className={language === "fr" ? "active" : ""} style={{height: "60px", margin: "0 5px"}} onClick={()=> setLanguage("fr")} src="/images/fr.png" alt="frenchSources" />
        <img className={language === "en" ? "active" : ""} style={{height: "60px", margin: "0 5px"}} onClick={()=> setLanguage("en")} src="/images/uk.png" alt="englishSources" />
      </div>
      <div className="Card">
        {articleWishlist && articleWishlist.length !== 0 ?
          renderArticles
        : 
          <Empty style={{marginTop: "30px"}}/>
        }
      </div>
      <Modal title={modalArticle.title} visible={isModalVisible} onOk={handleOk} footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          Ok
        </Button>
      ]}>
        <img
          alt="example"
          style={{width: "100%"}}
          src={modalArticle.img}
        />
        <p>{modalArticle.content}</p>
      </Modal>
    </div>
  );
}

export default ScreenMyArticles;

  // const FakeArticles = [
  //   { title: 'Bitcoin Power', description: 'Le bitcoin revient de tr??s loin et peut toujours...', img: './images/bitcoin.jpg', content: "L???agenda politique sur la monnaie num??rique publique, ainsi que ma r??cente visite du Mus??e cr???? par la Banque de France m???ont conduit ?? de multiples r??flexions. Qu???un ministre ne veuille pas de monnaie priv??e sur notre sol (curieux, d???ailleurs que ce soit pr??cis??ment ce mot ?? double sens qui affleure ici) c???est une chose. Que la chose soit impensable en est une autre.On va parler ici d???une monnaie priv??e ??mise justement par??? un ministre, et pas n???importe lequel. Au c??ur de l???appareil d???Etat, et en plein centre de la France. " },
  //   { title: "Sauver l'Alaska", description: 'Le r??chaffement climatique devrait concerner tout...', img: './images/alaska.jpg', content: "Peupl?? par des Al??outes, Esquimaux (notamment I??upiak et Yupiks) et peut-??tre d'autres Am??rindiens depuis plusieurs mill??naires, le territoire est colonis?? par des trappeurs russes ?? la fin du xviiie si??cle. L'Alaska vit alors essentiellement du commerce du bois et de la traite des fourrures. En 1867, les ??tats-Unis l'ach??tent ?? la Russie pour la somme de 7,2 millions de dollars (environ 120 millions de dollars actuels), et celui-ci adh??re ?? l'Union le 3 janvier 1959. Les domaines ??conomiques pr??dominants aujourd'hui sont la p??che, le tourisme, et surtout la production d'hydrocarbures (p??trole, gaz) depuis la d??couverte de gisements ?? Prudhoe Bay dans les ann??es 1970." },
  //   { title: "Gilets Jaune", description: 'Encore un samedi agit?? en IDF selon...', img: './images/giletjaune.jpg', content: "Selon une information de La Provence, ce samedi, deux ?? gilets jaunes ?? ont ??t?? interptions par les manifestants. En novembre, une dizaine de personnes avait ainsi ??t?? interpell??e par la police apr??s le saccage du p??age et un incendie volontaire." }
  // ]

