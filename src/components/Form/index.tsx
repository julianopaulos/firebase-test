import React, { type FormHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyleProps extends FormHTMLAttributes<HTMLFormElement> {
  elementHeight?: string
  elementWidth?: string
  color?: string
  margin?: string
  backgroundColor?: string
  borderTopLeftRadius?: string
  borderBottomLeftRadius?: string
  children: React.ReactNode
}

const StyledForm = styled.form<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Form = ({ children, ...props }: StyleProps): any => {
  return (
    <StyledForm {...props}>
        {children}
    </StyledForm>
  )
}

Form.displayName = 'Form'

export default Form
