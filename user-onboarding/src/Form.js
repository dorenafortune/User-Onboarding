import React from "react"
import * as Yup from "yup";
import axios from "axios";
import { withFormik, Form, Field } from "formik";

// 1. Create Formik Form. 
// Used <Form>, label htmoFor, then Field along with id, type, name, placeholder to create initial boxes
// Made button with <button> and type:checkmark to create Terms of Service box.

const PersonForm = ({ values, errors, touched }) => {
    return (

        <div className='person-form'>
            <Form>
                <label htmlFor='name'>Name:</label>
                <Field
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                {touched.name && errors.name && <p className="errors">{errors.name}</p>}

                <label htmlFor='email'>Email:</label>
                <Field
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                />

                {touched.email && errors.email && <p className="errors">{errors.email}</p>}
                <label htmlFor='Password'>Password:</label>
                <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"

                />
                {touched.password && errors.password && <p className="errors">{errors.password}</p>}
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
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false

        };
    },

    //step 2. Created Validation schema. Used Yup.boolean() for checkbox. Everything else was a string.
    //Validation schema
    validationSchema: Yup.object().shape({
        name: Yup.string().required(
            "Please put in a name"
        ),
        email: Yup.string().required(
            "Please put in an email"
        ),

        password: Yup.string().required(
            "Please put in a password"
        ),
        terms: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions")

    }),

    //end of validation schema
    
//Used axios post request to get the data back
    handleSubmit(
        values, {setStatus, resetForm}

    ) {
        console.log("submitting", values);
        axios
        .post("https://reqres.in/api/users", values
        )
        .then(res => {
            console.log("success", res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => 
            console.log(err.response)
            );
    }


})(PersonForm)

export default FormikPersonForm