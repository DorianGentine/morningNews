export default function(articleWishlist = [], action) {
  if(action.type === 'addArticle') {
    const check = articleWishlist.find(e=> e.title === action.article.title)
    if(!check){
      return [...articleWishlist, action.article];
    }else{
      return articleWishlist
    }
  } else if(action.type === 'deleteToWishList') {
    return articleWishlist.filter(e=> e.title !== action.title);
  } else {
    return articleWishlist;
  }
 }