export default function(user = {}, action) {
  if(action.type === 'saveUser') {
    return action.user
  }else if(action.type === 'removeUser') {
    return {}
  }else{
    return user;
  }
}