import React, { type TableHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;

  caption-side: bottom;
  width: 100%;

  td,
  th {
    border: none;
  }

  td, th {
    padding: 5px 10px;
    border-right: 1px solid black;
  }

  tr td: last-child, tr th: last-child {
    border-right: none;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
    padding: 5px 10px;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`
const Table = ({ children, ...props }: TableHTMLAttributes<HTMLTableElement>): any => {
  return (
    <StyledTable {...props}>
      {children}
    </StyledTable>
  )
}

export default Table
