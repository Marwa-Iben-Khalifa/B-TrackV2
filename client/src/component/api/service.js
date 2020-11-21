import axios from 'axios'


const errorHandler = err => {
  // console.error(err);
  throw err;
};
let service=axios.create({
  baseURL: "http://localhost:3001/api", 
  // withCredentials:true
})

export default{
  service,

  login(email, password) {
    return this.service.post('/login', {email, password})
      .then(response => response.data)
      .catch(errorHandler);
  },

  upload(formdata) {
    return this.service.post('/upload', formdata)
      .then(response => response.data)
      .catch(errorHandler);
  }
}