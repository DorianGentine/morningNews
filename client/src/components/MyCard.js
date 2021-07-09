import React, {useState} from 'react';
// import './App.css';
import { Card, Icon, Modal, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux'

const { Meta } = Card;

function MyCard({i, item}) {
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const user = useSelector(state=>state.user)
  const addArticleToWishList = async () => {
    const request = await fetch (`/save-article/${user.token}`, {
      method : 'POST',
      headers: {"Content-Type" : 'application/json'},
      body : JSON.stringify(item)
    })

    const response = await request.json()
    console.log(response);

    dispatch({ 
      type: "addArticle", 
      article: {
        img: item.urlToImage,
        title: item.title, 
        description: item.description, 
        content: item.content
      }
    })
  }

  return (
    <Card
      key={i}
      style={{ 
      width: 300, 
      margin:'15px', 
      display:'flex',
      flexDirection: 'column',
      justifyContent:'space-between' }}
      cover={<img alt="example" src={item.urlToImage} />}
      actions={[
          <Icon type="read" key="ellipsis2" onClick={showModal} />,
          <Icon type="like" key="ellipsis" onClick={addArticleToWishList}/> 
      ]}
      >
        <Meta
          title={item.title}
          description={item.description}
        />
        <Modal title={item.title} visible={isModalVisible} onOk={handleOk} footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Ok
          </Button>
        ]}>
          <p>{item.content}</p>
        </Modal>
    </Card>
  );
}

export default MyCard;