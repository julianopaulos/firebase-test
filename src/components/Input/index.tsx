import React, { forwardRef, type HTMLProps, type InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends InputHTMLAttributes<HTMLInputElement> {
  Elementwidth?: string
  margin?: string
}

const StyledInput = styled.input<StyleProps>`
  padding: 10px 15px;
  background-color: rgba(240, 240, 240, 1);
  border: none;
  border-radius: 3px;
  width: ${(p: StyleProps) => p.Elementwidth ?? '200px;'};
  margin: ${(p: StyleProps) => p.margin ?? '10px'};
`

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>((props: StyleProps, ref) => {
  return (
    <StyledInput
      {...props}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input
