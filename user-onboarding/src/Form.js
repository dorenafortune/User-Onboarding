import React, { useState, useEffect } from "react"
import * as Yup from "yup";
import axios from "axios";
import { withFormik, Form, Field } from "formik";

// 1. Create Formik Form. 
// Used <Form>, label htmoFor, then Field along with id, type, name, placeholder to create initial boxes
// Made button with <button> and type:checkmark to create Terms of Service box.


//Step 3. Created errors, touched so that message will pop up when requirement is not written in field. Wrote errors, touched, values in between PersonForm.
//{touched.name && errors.name && <p className="errors">{errors.name}</p>} 

//Step 4. Create an empty array of users and display returned data to screen, used useState and useEffect


const PersonForm = ({ status, values, errors, touched }) => {
    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        console.log("status has changed", status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    return (

        <div className='person-form'>
            <div className ="align-labels">
            <Form>
                <label htmlFor='name' className= "required-fields">Name:</label>
                <Field
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                {touched.name && errors.name && <p className="errors">{errors.name}</p>} 
                <br></br>

                <label htmlFor='email' className= "required-fields">Email:</label>
                <Field
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                <br></br>

                {touched.email && errors.email && <p className="errors">{errors.email}</p>}
                <label htmlFor='Password' className= "required-fields">Password:</label>
                <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"

                />
                <br></br>
                {touched.password && errors.password && <p className="errors">{errors.password}</p>}
               
               <br></br>

                <label htmlFor="terms" className="checkbox-container">Terms of Service</label>
                <Field
                    id="terms"
                    type="checkbox"
                    name="terms"
                />
               <br></br>
               {touched.terms && errors.terms && <p className="errors">{errors.terms}</p>}
                <button type="submit">Submit</button>

                

            </Form>
            </div>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
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
        terms: Yup.boolean().oneOf([true], "Must accept terms and conditions")

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