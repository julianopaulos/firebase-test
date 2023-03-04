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
`
