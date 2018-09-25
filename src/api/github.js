import request from './request';

const postUser = user => {
   return request({url: `https://data.usbnc.org/api/contact`, method: 'post', data: user})
}
//('https://data.usbnc.org/api/contact')

export default postUser 
