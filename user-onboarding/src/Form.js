import React from "react"
import * as Yup from "yup";
import axios from "axios";
import { withFormik, Form, Field } from "formik";

const PersonForm = ({ }) => {
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
                    type="text"
                    name="userPassword"
                    placeholder="Password"
                />

            </Form>
        </div>

    )
}

const FormikPersonForm = withFormik({})(PersonForm)

export default FormikPersonForm