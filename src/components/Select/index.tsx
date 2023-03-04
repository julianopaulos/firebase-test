import React, { forwardRef, type HTMLProps, type SelectHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends SelectHTMLAttributes<HTMLSelectElement> {
  color?: string
  margin?: string
  backgroundColor?: string
  children?: React.ReactNode
}

const StyledSelect = styled.select<StyleProps>`
  width: 200px;
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

const Select = forwardRef<HTMLSelectElement, HTMLProps<HTMLSelectElement>>(({ children, ...props }: StyleProps, ref) => {
  return (
    <StyledSelect {...props} ref={ref}>
        {children}
    </StyledSelect>
  )
})

Select.displayName = 'Select'

export default Select
