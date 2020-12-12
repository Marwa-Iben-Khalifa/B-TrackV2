import axios from 'axios'


const errorHandler = err => {
  throw err;
};
let service=axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}`, 
  withCredentials:true
})

export default{
  service,

  login(email, password) {
    return this.service.post('/login', {email, password})
      .then(response => response.data)
      // .catch(errorHandler);
  },

  signup(firstname, lastname, service, role, email, password, confirmPassword, imageURL) {
    return this.service.post('/signup', {
      firstname, 
      lastname, 
      service, 
      role, 
      email, 
      password, 
      confirmPassword,
      imageURL
    })
      .then(response => response.data)
      .catch(errorHandler);
  },

  loggedin() {
    return this.service.get('/loggedin')
      .then(response => response.data)
      .catch(errorHandler);
  },

  logout() {
    return this.service.get('/logout', {})
      .then(response => response.data)
      .catch(errorHandler);
  },

  edit(firstname, lastname, service, role, password, confirmPassword, imageURL) {
    return this.service.post('/edit', {
      firstname, 
      lastname, 
      service, 
      role, 
      password, 
      confirmPassword,
      imageURL
    })
      .then(response => response.data)
      .catch(errorHandler);
  },

  upload(formdata) {
    return this.service.post('/upload', formdata)
      .then(response => response.data)
      .catch(errorHandler);
  },

  newBug(title, description, solution, services, status, severity){
    return this.service.post('/create-bug', {
      title, 
      description, 
      solution, 
      services, 
      status, 
      severity 
    })
    .then(response => response.data)
    .catch(errorHandler);
  }

  
}