import React, { forwardRef, type HtmlHTMLAttributes, type ForwardedRef } from 'react'
import styled from 'styled-components'

interface StyleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  display?: string
  alignItems?: string
  justifyContent?: string
  flexDirection?: string
  backgroundColor?: string
  children?: React.ReactNode
}

const StyledDiv = styled.div<StyleProps>`
  width: 100%;
  margin: 0;
  padding: 0;
  display: ${(p: StyleProps) => p.display ?? 'flex'};
  align-items: ${(p: StyleProps) => p.alignItems ?? 'center'};
  justify-content: ${(p: StyleProps) => p.justifyContent ?? 'flex-start'};
  flex-direction: ${(p: StyleProps) => p.flexDirection ?? 'row'};
  background-color: ${(p: StyleProps) => p.backgroundColor ?? 'inherit'};
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
