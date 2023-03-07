import React, { forwardRef, type HtmlHTMLAttributes, type ForwardedRef } from 'react'
import styled from 'styled-components'

interface StyleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  display?: string
  alignItems?: string
  justifyContent?: string
  backgroundColor?: string
  children?: React.ReactNode
}

const StyledDiv = styled.div<StyleProps>`
  margin: 0;
  padding: 0;
  display: ${(p: StyleProps) => p.display ?? 'flex'};
  align-items: ${(p: StyleProps) => p.alignItems ?? 'center'};
  justify-content: ${(p: StyleProps) => p.alignItems ?? 'flex-start'};
  background-color: ${(p: StyleProps) => p.backgroundColor ?? 'white'};
`

const Div = forwardRef(({ children, ...props }: StyleProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <StyledDiv {...props} ref={ref}>
        {children}
    </StyledDiv>
  )
})

Div.displayName = 'Div'

export default Div
