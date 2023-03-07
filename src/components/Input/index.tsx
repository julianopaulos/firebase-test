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
  padding: 10px 15px;
  background-color: rgba(240, 240, 240, 1);
  border: none;
  border-radius: 3px;
  border-top-right-radius: ${(p: StyleProps) => p.borderTopRightRadius ?? 'inherit'};
  border-bottom-right-radius: ${(p: StyleProps) => p.borderBottomRightRadius ?? 'inherit'};
  height: ${(p: StyleProps) => p.elementHeight ?? '15px'};
  width: ${(p: StyleProps) => p.elementWidth ?? '200px'};
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
