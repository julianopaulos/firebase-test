import React, { type ForwardedRef, forwardRef, type SelectHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends SelectHTMLAttributes<HTMLSelectElement> {
  color?: string
  margin?: string
  backgroundColor?: string
  children?: React.ReactNode
}

const StyledSelect = styled.select<StyleProps>`
  width: 250px;
  height: 20px;
  padding: 10px 15px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${(p: StyleProps) => p.color ?? 'black'};
  background-color: ${(p: StyleProps) => p.backgroundColor ?? 'white'};
  margin: ${(p: StyleProps) => p.margin ?? '10px'};
  transition: .3s;

  &:hover {
    opacity: .8;
  }
`

const Select = forwardRef(({ children, ...props }: StyleProps, ref: ForwardedRef<HTMLSelectElement>) => {
  return (
    <StyledSelect {...props} ref={ref}>
        {children}
    </StyledSelect>
  )
})

Select.displayName = 'Select'

export default Select
