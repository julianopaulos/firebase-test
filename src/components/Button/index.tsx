import React, { type ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  elementHeight?: string
  elementWidth?: string
  color?: string
  margin?: string
  backgroundColor?: string
  borderTopLeftRadius?: string
  borderBottomLeftRadius?: string
  children: React.ReactNode
}

const StyledButton = styled.button<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  font-size: 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  border-top-left-radius: ${(p: StyleProps) => p.borderTopLeftRadius ?? 'inherit'};
  border-bottom-left-radius: ${(p: StyleProps) => p.borderBottomLeftRadius ?? 'inherit'};
  height: ${(p: StyleProps) => p.elementHeight ?? '15px'};
  width: ${(p: StyleProps) => p.elementWidth ?? '200px'};
  color: ${(p: StyleProps) => p.color ?? 'black'};
  background-color: ${(p: StyleProps) => p.backgroundColor ?? 'rgba(200, 200, 200, 1)'};
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
