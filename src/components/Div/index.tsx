import React, { forwardRef, type HtmlHTMLAttributes, type ForwardedRef } from 'react'
import styled from 'styled-components'

interface StyleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  elementHeight?: string
  elementWidth?: string
  display?: string
  margin?: string
  padding?: string
  alignItems?: string
  justifyContent?: string
  flexDirection?: string
  backgroundColor?: string
  borderRadius?: string
  boxShadow?: string
  textColor?: string
  fontSize?: string
  lineHeight?: string
  children?: React.ReactNode
}

const StyledDiv = styled.div<StyleProps>`
  width: 100%;
  margin: ${(p: StyleProps) => p.margin ?? '0'};
  padding: ${(p: StyleProps) => p.padding ?? '0'};
  height: ${(p: StyleProps) => p.elementHeight ?? 'auto'};
  width: ${(p: StyleProps) => p.elementWidth ?? '100%'};
  display: ${(p: StyleProps) => p.display ?? 'flex'};
  align-items: ${(p: StyleProps) => p.alignItems ?? 'center'};
  justify-content: ${(p: StyleProps) => p.justifyContent ?? 'flex-start'};
  flex-direction: ${(p: StyleProps) => p.flexDirection ?? 'row'};
  background-color: ${(p: StyleProps) => p.backgroundColor ?? 'inherit'};
  border-radius: ${(p: StyleProps) => p.borderRadius ?? '0'};
  box-shadow: ${(p: StyleProps) => p.boxShadow ?? '0'};
  color: ${(p: StyleProps) => p.textColor ?? 'inherit'};
  font-size: ${(p: StyleProps) => p.fontSize ?? 'inherit'};
  line-height: ${(p: StyleProps) => p.lineHeight ?? 'inherit'};

  h3 {
    height: 25px;
  }
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
