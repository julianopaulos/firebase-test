import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'
import Button from '../Button'
import Div from '../Div'
import Input from '../Input'

interface Props {
  title: string
  placeholder: string
  action: SubmitHandler<any>
}

const SearchInputAndButton = (props: Props): any => {
  const { handleSubmit, register } = useForm<any>()

  return (
    <form onSubmit={ handleSubmit(props.action) }>
      <h3>{props.title}:</h3>
      <Div>
        <Input
          type='text'
          placeholder={props.placeholder}
          margin='10px 0'
          borderTopRightRadius='0'
          borderBottomRightRadius='0'
          {...register('uuid', { min: 1 })}
        />
        <Button
          type="submit"
          elementWidth='20px'
          borderTopLeftRadius='0'
          borderBottomLeftRadius='0'
          margin='10px 0'
        >
          <AiOutlineSearch />
        </Button>
      </Div>
    </form>
  )
}

export default SearchInputAndButton
