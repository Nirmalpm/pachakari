import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import NumberFormat from 'react-number-format';
import _isObject from 'lodash/isObject';
import {getStyles} from '../utils/StyleUtil';


const Input = ({ field, form }) => (
    <input
      type="file"
      name={field.name}
      onChange={e => {
        form.setFieldValue("file", e.currentTarget.files[0]);
      }}
    />
  );

class ItemForm extends React.Component{
    state={key:new Date().toString()}
    renderPrice = ({
        field:{name, value, onChange, onBlur},
        form:{touched, errors, values, setFieldValue, setFieldTouched},
        ...custom
    }) => {
        return (
            <NumberFormat
                name={name}
                value={_isObject(value) ? value.formattedValue : value}
                decimalSeparator='.'
                decimalScale= '2'
                allowNegative='false'
                onValueChange ={val =>{
                    setFieldValue(name, val.floatValue || this.props.defaultValues[name])
                }}
                {...custom}
            />
        );
    };

    renderQuantity = ({
        field:{name,value},
        form:{setFieldValue},
        ...custom
    }) => {
       // console.log(custom)
        return (
            <NumberFormat
                name={name}
                value={_isObject(value) ? value.formattedValue : value}
                allowNegative='false'
                decimalSeparator='.'
                decimalScale= '2'
                onValueChange ={val =>{
                    setFieldValue(name, val.floatValue || this.props.defaultValues[name])
                }}
                {...custom}
            />
        );
    };
    render(){
        const {defaultValues}=this.props;
      //  console.log(defaultValues)
       return(
           <div>
            <Formik
            enableReinitialize={true}
            initialValues={defaultValues}
            validate={(values) => {
                const errors = {};
                if (!values.itemName) errors.itemName = 'Required';
                if (!values.itemPrice) errors.itemPrice = 'Required';
                if (!values.itemQuantity) errors.itemQuantity = 'Required';
                if (!values.itemUnit) errors.itemUnit = 'Required';
                return errors;
              }}
            onSubmit={(values,{resetForm,setSubmitting,setFieldValue})=>{
                //alert(JSON.stringify(values));
                setSubmitting(true);
                this.props.onSubmit(values,resetForm,setSubmitting);
            }}
            onReset={(values,{setSubmitting})=>{
                alert(JSON.stringify(values));
                setSubmitting(false);
                //this.props.onSubmit(values,resetForm,setSubmitting);
            }}
            
            > 
            { ({values,errors,touched,handleChange,handleBlur,
            isSubmitting,handleSubmit,handleReset,dirty}) =>{
                if(defaultValues.edit){
                    dirty=true;
                }
               // console.log(values)
                return(
                    <Form onSubmit={()=>handleSubmit()}>
                        <label htmlFor="itemName">Name</label><br/>
                        <Field  name="itemName" component="input" type="text" 
                        className={getStyles(errors,touched, 'itemName')}/>
                        <ErrorMessage name="itemName"/><br/>

                        <label htmlFor="itemDescription">Description</label><br/>
                        <textarea  name="itemDescription" onChange={handleChange} 
                        value={values.itemDescription}/><br/>                        

                        <label htmlFor="itemPrice">Price</label><br/>
                        <Field  name="itemPrice" component={this.renderPrice} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={getStyles(errors,touched, 'itemPrice')}
                        placeholder='₹'
                        />
                        <ErrorMessage name="itemPrice"/><br/>

                        <label htmlFor="itemQuantity">Quantity</label><br/>
                        <Field  name="itemQuantity" component={this.renderQuantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={getStyles(errors,touched, 'itemQuantity')}
                        />
                        <ErrorMessage name="itemQuantity"/><br/>

                        <label htmlFor="itemUnit">Unit</label><br/>
                        <select name="itemUnit" style={getStyles(errors,touched, 'itemUnit')} 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.itemUnit}
                            >
                            <option value="" label="Select a unit" />
                            <option value="KGS">Kilo grams</option>
                            <option value="GMS">Grams</option>
                            <option value="CNT">Count</option>
                        </select><br/>
                        <ErrorMessage name="itemUnit"/><br/>

                        <label htmlFor="file">Image</label><br/>
                        <Field key={this.state.key} name="file" component={Input} /><br/><br/>
                        {defaultValues.edit ? 
                                <button className="button ui primary" 
                                type="submit" disabled={isSubmitting}> Update</button> 
                         : 
                                <button className="button ui primary" type="submit" 
                                disabled={isSubmitting}> Submit</button>
                        }
                        
                        <button className="button ui primary" 
                        onClick={(event) =>handleReset()} disabled={!dirty }> Reset</button>
                    </Form>
                );
            }}
            </Formik>         
            </div>  
        );
    }
}

export default ItemForm;