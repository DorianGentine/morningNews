import React, {useState} from 'react';
// import './App.css';
import { Card, Icon, Modal, Button } from 'antd';
import {useDispatch} from 'react-redux'

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
          <Icon type="like" key="ellipsis" onClick={()=> dispatch({ 
            type: "addArticle", 
            article: {
              img: item.urlToImage,
              title: item.title, 
              description: item.description, 
              content: item.content
            } 
          })}/>
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