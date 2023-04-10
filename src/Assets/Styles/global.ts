import { type HtmlHTMLAttributes } from 'react'
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle<HtmlHTMLAttributes<HTMLElement>>`
  *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; 
    box-sizing: content-box;
  }

  body {
    background-color: rgba(240, 240, 240, 1);
  }

  a, svg {
    text-decoration: none;
    transition: .4s;
    color: #8050CC;
  }

  a:hover, svg:hover {
    opacity: 0.6;
  }

  .menu {
    transition: opacity .6s;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  .menu.active {
    opacity: 1;
    height: auto;
  }
`
