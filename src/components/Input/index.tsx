import React, { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends InputHTMLAttributes<HTMLInputElement> {
  elementHeight?: string
  elementWidth?: string
  margin?: string
  borderTopRightRadius?: string
  borderBottomRightRadius?: string
}

const StyledInput = styled.input<StyleProps>`
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  padding: 10px 15px;
  background-color: white;
  border: none;
  border-radius: 5px;
  border-top-right-radius: ${(p: StyleProps) => p.borderTopRightRadius ?? '5px'};
  border-bottom-right-radius: ${(p: StyleProps) => p.borderBottomRightRadius ?? '5px'};
  height: ${(p: StyleProps) => p.elementHeight ?? '20px'};
  width: ${(p: StyleProps) => p.elementWidth ?? '250px'};
  margin: ${(p: StyleProps) => p.margin ?? '10px'};
`

const Input = forwardRef((props: StyleProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <StyledInput
      {...props}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input
