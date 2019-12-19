import React from "react"
import * as Yup from "yup";
import axios from "axios";
import { withFormik, Form, Field } from "formik";

// 1. Create Formik Form. 
// Used <Form>, label htmoFor, then Field along with id, type, name, placeholder to create initial boxes
// Made button with <button> and type:checkmark to create Terms of Service box.

const PersonForm = ({}) => {
    return (

        <div className='person-form'>
            <Form>
                <label htmlFor='name'>Name:</label>
                <Field
                    id="user"
                    type="text"
                    name="userName"
                    placeholder="Name"
                />

                <label htmlFor='email'>Email:</label>
                <Field
                    id="email"
                    type="text"
                    name="userEmail"
                    placeholder="Email"
                />
                  <label htmlFor='Password'>Password:</label>
                <Field
                    id="password"
                    type="password"
                    name="userPassword"
                    placeholder="Password"
    
                />
                <br></br>
                <label htmlFor="terms" className="checkbox-container">Terms of Service</label>
                <Field
                 id="terms"
                 type="checkbox"
                 name="terms"
                 />
                 <br></br>
                <button type="submit">Submit</button>

            </Form>
        </div>
     

    );
};



const FormikPersonForm = withFormik({
    mapPropsToValues ({userName, userEmail, userPassword,terms }){
        return{
            userName: userName || '',
            userEmail: userEmail || '',
            userPassword: userPassword || '',
            terms: terms || false

        };
    },
//Validation schema
        validationSchema: Yup.object().shape({
            userName: Yup.string().required(
                "Please put in a name"
            ),
            userEmail: Yup.string().required(
                "Please put in an email"
            ),

            userPassword: Yup.string().required(
                "Please put in a password"
            ),


            terms: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions")

        })

//end of validation schema

    
})(PersonForm)

export default FormikPersonForm