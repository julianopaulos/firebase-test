import React, { type ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  margin?: string
  backgroundColor?: string
  children: React.ReactNode
}

const StyledButton = styled.button<StyleProps>`
  padding: 10px 15px;
  font-size: 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: ${(p: StyleProps) => p.color ?? 'black'};
  background-color: ${(p: StyleProps) => p.backgroundColor ?? 'rgba(240, 240, 240, 1)'};
  margin: ${(p: StyleProps) => p.margin ?? '10px'};
  transition: .3s;

  &:hover {
    opacity: .8;
  }
`

const Button = ({ children, ...props }: StyleProps): any => {
  return (
    <StyledButton {...props}>
        {children}
    </StyledButton>
  )
}

Button.displayName = 'Button'

export default Button
