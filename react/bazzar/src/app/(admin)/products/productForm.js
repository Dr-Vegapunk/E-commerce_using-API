import React from 'react';
import { Icon } from '@iconify/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Card, CardBody, Select, SelectItem, Textarea } from '@nextui-org/react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  price: Yup.number()
    .min(0, 'Price must be positive')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),
  images: Yup.array()
    .of(Yup.string().url('Must be a valid URL'))
    .min(1, 'At least one image is required')
    .required('Required'),
  categoryId: Yup.number()
    .required('Category is required'),
});

const ProductForm = ({ type, product, handleSubmit, categories }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValues = product 
    ? { 
        ...product, 
        categoryId: product.category.id,
        images: product.images.length > 0 ? product.images : ['']
      } 
    : { 
        title: '', 
        description: '', 
        price: '', 
        images: [''], 
        categoryId: '' 
      };

  const onSubmit = (values, { resetForm }) => {
    handleSubmit(values, product?.id);
    if (type === 'Add') {
      resetForm();
      onOpenChange(false);
    }
  };

  const FormContent = () => (
    <Formik
      initialValues={initialValues}
      validationSchema={FormSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleChange, values, setFieldValue }) => (
        <Form className='flex flex-col gap-4'>
          <Input
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Enter product title"
            isInvalid={errors.title && touched.title}
            errorMessage={errors.title && touched.title ? errors.title : null}
          />
          <Input
            name="price"
            type="number"
            value={values.price}
            onChange={(e) => setFieldValue('price', Number(e.target.value))}
            placeholder="Enter product price"
            isInvalid={errors.price && touched.price}
            errorMessage={errors.price && touched.price ? errors.price : null}
          />
          <Textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Enter product description"
            isInvalid={errors.description && touched.description}
            errorMessage={errors.description && touched.description ? errors.description : null}
          />
          <FieldArray name="images">
            {({ remove, push }) => (
              <div>
                {values.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      name={`images.${index}`}
                      value={image}
                      onChange={handleChange}
                      placeholder={`Enter image URL ${index + 1}`}
                      isInvalid={errors.images?.[index] && touched.images?.[index]}
                      errorMessage={errors.images?.[index] && touched.images?.[index] ? errors.images[index] : null}
                    />
                    {index > 0 && (
                      <Button size="sm" color="danger" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button size="sm" onClick={() => push('')}>
                  Add Image URL
                </Button>
              </div>
            )}
          </FieldArray>
          <Select
            name="categoryId"
            value={values.categoryId}
            onChange={(e) => setFieldValue('categoryId', e.target.value)}
            placeholder="Select a category"
            isInvalid={errors.categoryId && touched.categoryId}
            errorMessage={errors.categoryId && touched.categoryId ? errors.categoryId : null}
          >
            {categories?.length > 0 && categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>

          <Button color="primary" type="submit">
            {type === 'Edit' ? 'Update' : 'Add'} Product
          </Button>
        </Form>
      )}
    </Formik>
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
          Add Product
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
                {type === 'Edit' ? 'Edit' : 'Add'} Product
              </ModalHeader>
              <ModalBody>
                <FormContent />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductForm;

