import { Icon } from '@iconify/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    image: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
  });
  const FormInput = (props) => (
    <div>
  
      <Formik
        initialValues={props.item ? props.item : {name: '',image:''}}
        enableReinitialize={true}
        validationSchema={FormSchema}
        onSubmit={values => {
          props.handleSubmit(values, props.item.id)
        }}
      >
        {({ errors, touched, handleChange,values }) => (
              <div className="flex justify-center items-center">
              <Card className="flex p-4">
              <CardBody className="flex gap-2">
          <Form className='flex flex-col '>
            <Input name="name"  value={values.name}   className={errors.name ? ' border border-red-600 rounded-md': null} onChange={handleChange} placeholder="Enter Full Name"/>
            {errors.name && touched.name ? (
              <div className='text-red-900 text-sm'>{errors.name}</div>
            ) : null}
         
            <Input name="image" value={values.image}  onChange={handleChange}  placeholder='enter image'/>
            {errors.image && touched.image ? <div>{errors.image}</div> : null}
       
          <Button className='bg-[#3C5C7D] text-white' type="submit">Save</Button>
          </Form>
          </CardBody>
          </Card>
          </div>
        )}
      </Formik>
    </div>
  );


export default function CategoriesForm(props){
        const {isOpen, onOpen, onOpenChange} = useDisclosure();
      return (
        <div>
            <>
          {props.type==='Edit'?<Icon icon="icon-park:edit-two" className='absolute right-5 top-4 w-6 h-6' />:<Button onPress={onOpen} color="primary" className='absolute top-1 right-5'> Add Category </Button>}
          <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Add a category</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      endContent={
                        <Icon icon="carbon:category-add" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="name"
                      placeholder="Enter category name"
                      variant="bordered"
                    />
                    <Input
                      endContent={
                        <Icon icon="catppuccin:image" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="image"
                      placeholder="Enter category image url"
                      variant="bordered"
                    />
                    
                  </ModalBody>
                  <ModalFooter >
                    <Button color="danger" variant="flat" onPress={onClose}  >
                      Add Category
                    </Button>
    
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    
    
        </div>
      )
    }
    
