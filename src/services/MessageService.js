import md5 from 'md5';
import { httpService } from './HttpService';

export const messageService = {
  addMessage,
  getMessages,
  getUserImg
};


function getMessages(filterBy) {
  let qst = '';
  if (filterBy) {
      qst =`?message=${filterBy}`
  }
  return httpService.get(`message/${qst}`);
}

function addMessage(message) {
  return httpService.post(`message/`, message);

}

function getUserImg(userEmail) {
  userEmail = md5(userEmail.toLowerCase().trim())
  const userImg = `https://www.gravatar.com/avatar/${userEmail}`
  return userImg;
}