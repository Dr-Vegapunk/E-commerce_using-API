import React from 'react'
import { Card, Image, CardBody } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import CategoriesForm from './categoriesForm'

const CategoriesList = (props) => {
  return (
    <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-2'>
      {props.categories.map((item) => (
        <Card key={item.id}>
          <CardBody>
            < h2>{item.name}</h2>
            <Image
              src={item.image}
              alt={item.name}
              objectFit="cover"
              width="40%"
              height={140}
            />
          </CardBody>
         
              <CategoriesForm type={'Edit'} item={props.item} handleSubmit={props.handleSubmit(item)}/>
            
            
            <Icon icon="icon-park:delete" className='absolute right-5 top-14 w-6 h-6' onClick={()=>props.handleDelete(item)} />
           
        
         
        </Card>
      ))}
    </div>
  )
}

export default CategoriesList