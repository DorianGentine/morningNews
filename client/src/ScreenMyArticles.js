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



  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalArticle, setModalArticle] = useState({})
  const showModal = article => {
    setModalArticle(article)
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const renderArticles = articleWishlist.map( (article, index) => 
    
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
            <Icon type="delete" key="ellipsis" onClick={()=> dispatch({
              type: "deleteToWishList", 
              title: article.title
            })}/>
          ]}
        >
          <Meta
            title={article.title}
            description={article.description}
          />
        </Card>
      </div>
  )

  return (
    <div>
      <Nav />
      <div className="Banner" />
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
  //   { title: 'Bitcoin Power', description: 'Le bitcoin revient de très loin et peut toujours...', img: './images/bitcoin.jpg', content: "L’agenda politique sur la monnaie numérique publique, ainsi que ma récente visite du Musée créé par la Banque de France m’ont conduit à de multiples réflexions. Qu’un ministre ne veuille pas de monnaie privée sur notre sol (curieux, d’ailleurs que ce soit précisément ce mot à double sens qui affleure ici) c’est une chose. Que la chose soit impensable en est une autre.On va parler ici d’une monnaie privée émise justement par… un ministre, et pas n’importe lequel. Au cœur de l’appareil d’Etat, et en plein centre de la France. " },
  //   { title: "Sauver l'Alaska", description: 'Le réchaffement climatique devrait concerner tout...', img: './images/alaska.jpg', content: "Peuplé par des Aléoutes, Esquimaux (notamment Iñupiak et Yupiks) et peut-être d'autres Amérindiens depuis plusieurs millénaires, le territoire est colonisé par des trappeurs russes à la fin du xviiie siècle. L'Alaska vit alors essentiellement du commerce du bois et de la traite des fourrures. En 1867, les États-Unis l'achètent à la Russie pour la somme de 7,2 millions de dollars (environ 120 millions de dollars actuels), et celui-ci adhère à l'Union le 3 janvier 1959. Les domaines économiques prédominants aujourd'hui sont la pêche, le tourisme, et surtout la production d'hydrocarbures (pétrole, gaz) depuis la découverte de gisements à Prudhoe Bay dans les années 1970." },
  //   { title: "Gilets Jaune", description: 'Encore un samedi agité en IDF selon...', img: './images/giletjaune.jpg', content: "Selon une information de La Provence, ce samedi, deux « gilets jaunes » ont été interptions par les manifestants. En novembre, une dizaine de personnes avait ainsi été interpellée par la police après le saccage du péage et un incendie volontaire." }
  // ]

