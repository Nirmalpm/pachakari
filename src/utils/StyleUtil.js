import {getIn} from 'formik';
export const getStyles = (errors,touched, formName) =>{
    if(getIn(errors,formName) && getIn(touched,formName)){
        return "errorField"
    }
}