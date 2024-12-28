import React from 'react';
import { Icon } from '@iconify/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Card, CardBody } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Required'),
});

const CategoriesForm = ({ type, item, handleSubmit }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValues = item || { name: '', image: '' };

  const onSubmit = (values, { resetForm }) => {
    handleSubmit(values);
    if (type === 'Add') {
      resetForm();
      onOpenChange(false);
    }
  };

  const FormContent = ({ errors, touched, handleChange, values }) => (
    <Form className='flex flex-col gap-4'>
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter Full Name"
        isInvalid={errors.name && touched.name}
        errorMessage={errors.name && touched.name ? errors.name : null}
      />
      <Input
        name="image"
        value={values.image}
        onChange={handleChange}
        placeholder='Enter image URL'
        isInvalid={errors.image && touched.image}
        errorMessage={errors.image && touched.image ? errors.image : null}
      />
      <Button color="primary" type="submit">
        {type === 'Edit' ? 'Update' : 'Add'} Category
      </Button>
    </Form>
  );

  return (
    <div>
      {type === 'Edit' ? (
        <Icon 
          icon="icon-park:edit-two" 
          className='absolute right-5 top-4 w-6 h-6 cursor-pointer' 
          onClick={onOpen}
        />
      ) : (
        <Button onPress={onOpen} color="primary">
          Add Category
        </Button>
      )}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {type === 'Edit' ? 'Edit' : 'Add'} Category
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={FormSchema}
                  onSubmit={onSubmit}
                >
                  {(formikProps) => <FormContent {...formikProps} />}
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoriesForm;