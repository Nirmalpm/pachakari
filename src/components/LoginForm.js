import React,{Component} from 'react';
import {Formik, Form} from 'formik';
import {connect} from 'react-redux';
import {login, logout} from '../actions/signin';
import {NavLink} from 'react-router-dom';

const initialValues ={userName:'',password:''}

class LoginForm extends Component{
    logout=(event)=>{
        event.preventDefault();
        this.props.logout();
    }
    render (){
        return (
            <div >
                <Formik
                    initialValues={initialValues}
                    onSubmit={
                        (values) =>{
                            this.props.login(values.userName,values.password);
                        }
                    }
                >
                    {(formProps) =>{
                        return(
                        <div className="signIn bgImage">
                        <Form onSubmit={formProps.handleSubmit}>
                            <label htmlFor="userName">UserName</label>
                            <input name="userName" 
                            id="userName" 
                            type="text"
                            onChange={formProps.handleChange}
                            onBlur={formProps.handleBlur}/>
                            <br/>
                            <label htmlFor="password">Password</label>
                            <input name="password" 
                            id="password" 
                            type="password"
                            onChange={formProps.handleChange}
                            onBlur={formProps.handleBlur}/>
                            <br/>
                            <button type="submit">Sign In</button>
                            <NavLink className="signUp-text" to="/signup">Sign Up?</NavLink>                            
                        </Form>
                        
                        </div>    
                        )
                    }}
                </Formik>
            </div>
            
        );
    }
} 

const mapStateToProps = (state) =>{
    //console.log(state);
    return state.signin;
}

export default connect(mapStateToProps,{login,logout})(LoginForm)