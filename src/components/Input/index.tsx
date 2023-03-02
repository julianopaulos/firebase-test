import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

const Input = (props: any): any => {
  return (
    <StyledInput
      {...props}
    />
  )
}

export default Input
