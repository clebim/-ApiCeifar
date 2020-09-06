import { createGlobalStyle } from 'styled-components'
import Background from '../assets/photo.jpg'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@400;700&family=Red+Rose:wght@400;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus{
    outline: 0;
  }
  
  html, body, #root {
    height: 100%;
  }
  
  body{
    -webkit-font-smoothing: antialiased !important;
    background: url(${Background}) no-repeat;
    background-size: cover;
  }
  
  body, input, button{
    font: 14px 'Roboto', sans-serif;
  }
  
  a{
    text-decoration: none;
    cursor: pointer;
  }
  
  ul{
    list-style: none;
  }
  
  button{
    cursor: pointer;
  }
`
