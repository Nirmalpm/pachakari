import React from 'react';
import {Formik,Form, Field} from 'formik';
import {getStyles} from '../utils/StyleUtil'
import {signUp, getUser,signUpConfirm} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';

class SignUp extends React.Component{
    state={user:null, error:''}

    initialValues={
        userName:'',
        firstName:'',
        lastName:'',
        email:''
    }

    handleRegister = (values) =>{
        
         //console.log({...this.state.user,password:values.password})
        this.props.signUpConfirm({...this.state.user,password:values.password});
    }

    validate = (values) =>{
        let errors={}
        if(!values.userName) errors.userName = 'Required';
        if(!values.firstName) errors.firstName = 'Required';
        if(!values.lastName) errors.lastName = 'Required';
        if(!values.email) errors.email = 'Required';
        if(this.state.user){
            if(!values.password) errors.password = 'Required';
            if(!values.confirmpassword) errors.confirmpassword = 'Required';
            if(values.password !== values.confirmpassword) {
                errors.error='Passwords are not matching!';
            }else {
                errors.error= "";
            }
        }
        console.log(errors)

        return errors;
    }

    renderUpdateButtons = (values,errors,touched,handleChange,handleBlur) =>{
        if(this.state.user){
            return(
                <div>
                 <label htmlFor="password">Password</label><br/>   
                 <Field type="password" name="password" 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                className={getStyles(errors,touched, 'password')}
                                placeholder={errors && errors.password?'Password is required':'Password'}  
                                /><br/>
                 {errors.error ?<span className="errorMsg">{errors.error}<br/></span>: null}                 
                 <label htmlFor="confirmpassword">Confirm Password</label><br/>                                 
                 <Field type="password" name="confirmpassword" 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                className={getStyles(errors,touched, 'confirmpassword')}
                                placeholder={errors && errors.confirmpassword?'Password is required':'Confirm Password'}  
                                /><br/>     
                               
                <button type="button" onClick={()=>this.handleRegister(values)}>Update</button> 
                </div>
            )
        }else{
            return(
                <div>
                    <button type="submit">Sign Up</button>    
                    <button type="reset">Reset</button>
                </div>
            )             
        }
    }

    render(){
        //console.log('rendered............',this.state);
      
        return(
            <div className={this.state.user ? "signUpUser": "signUp"}>
                <Formik
                    initialValues={this.initialValues}
                    validate={this.validate}
                    onSubmit={(values)=>{
                        console.log(values)
                        this.props.signUp(values)
                    }}
                >
                    {({values,errors,touched,handleBlur,handleChange,handleSubmit,handleReset})=>{
                        //console.log(values);
                        const disabled = this.state.user != null ;
                        return(
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor="userName">User Name</label>
                                <Field type="text" name="userName" 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                value={this.state.user?this.state.user.userName :values.userName}
                                className={getStyles(errors,touched, 'userName')}
                                placeholder={errors.userName?'User Name is required':'User Name'}  
                                disabled= {disabled}                            
                                /><br/>
                                <label htmlFor="firstName">First Name</label>
                                <Field type="text" name="firstName" 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                value={this.state.user?this.state.user.firstName :values.firstName}
                                className={getStyles(errors,touched, 'firstName')}
                                placeholder={errors.userName?'First Name is required':'First Name'}                                
                                disabled= {disabled}
                                /><br/>
                                <label htmlFor="lastName">Last Name</label>
                                <Field type="text" name="lastName" 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                value={this.state.user?this.state.user.lastName :values.lastName}
                                 className={getStyles(errors,touched, 'lastName')}
                                placeholder={errors.userName?'Last Name is required':'Last Name'}                                
                                disabled= {disabled}
                                /><br/>
                                <label htmlFor="email">Email</label>
                                <Field type="email" name="email" 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                className={getStyles(errors,touched, 'email')}
                                value={this.state.user?this.state.user.emailId :values.email}
                                placeholder={errors.userName?'Email is required':'Email'} 
                                disabled= {disabled}
                                /><br/>
                                {this.renderUpdateButtons(values,errors,touched,handleChange,handleBlur)} 
                            </Form>
                        );                        
                    }}
                </Formik>
            </div>
        )
    }

    componentDidMount(){
        //console.log('componentDidMount............');
        if(this.props.location && this.props.location.search){
            const id = this.props.location.search.substring(4);
            this.props.getUser(id);
        }        
    }
    shouldComponentUpdate(nextProps, nextState){
        //console.log('shouldComponentUpdate............',this.state.user,nextState.user);
        //console.log('shouldComponentUpdate............',this.props.user,nextProps.user);
        const pr = !_.isEqual(this.props.user,nextProps.user)
        const st = !_.isEqual(this.state.user,nextState.user)
        //console.log(st || pr)
        return  pr || st
    }

    componentDidUpdate(){
        //console.log('componentDidUpdate............');
        this.setState({user:this.props.user})
    }
}

const mapStateToProps = (state) =>{
    console.log('mapStateToProps............',);
    console.log(state)
    return state.signin;
}

export default connect(mapStateToProps,{signUp,getUser,signUpConfirm})(SignUp);