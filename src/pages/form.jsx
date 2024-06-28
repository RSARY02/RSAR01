import React, { useState } from "react";
import {useForm} from 'react-hook-form';
import "../styles/form.css";

const Form = () => {
    const {register, handleSubmit, formState:{errors}}=useForm();

    // const [name, setName] = useState('');
    // const [requestSchema, setRequestSchema] = useState('');
    // const [responseSchema, setResponseSchema] = useState('');
    // const [url, setUrl] = useState('');
    const [isValid, setIsValid] = useState(null);

    const validateUrl = (value) => {
        const pattern = /^((ftp|http|https):\/\/)?www\.?([A-z]+)\.([A-z]{2,})/;
        return pattern.test(value) || 'Provide valid url';
    }
    const onSubmit = (data) => {
        // event.preventDefault();
        // try{
        //     if(requestSchema.trim()!=="" && responseSchema.trim()!==""){
        //         JSON.parse(requestSchema);
        //         JSON.parse(responseSchema);
        //         setIsValid(true);
        //         console.log('Form Submitted');
                console.log(data);
                setIsValid(true);
            // }else{
            //     setIsValid(false);
            //     console.error('Request and response schemas cannot be empty');
            }     
    // }catch(error){
    //     setIsValid(false);
    //     console.error('Invalid JSON format', error);
    // }

    const validateJson = (value) => {
        try{
            JSON.parse(value);
            return true;
        } catch (error) {
            return false;
        }
    }

return(
    <div className="container">
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Service Name</label>
                    <input id="name"
                    {...register('name', {required: "Service Name is required"})}/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                {/* <label>Service Name</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} required/> */}
                <div>
                    <label htmlFor="requestschema">Request Schema</label>
                    <textarea id="requestschema" 
                    {...register('requestschema', {required: "Request Schema is required",
                        validate: {
                            isValidJson: (value) => validateJson(value) || "Invalid JSON format",
                        },
                    })}/>
                    {errors.requestschema && <p>{errors.requestschema.message}</p>}
                </div>
                {/* <label>Request Schema</label>
                <textarea value={requestSchema} onChange={(event) => setRequestSchema(event.target.value)}/> */}
                <div>
                    <label htmlFor="responseschema">Response Schema</label>
                    <textarea id="responseschema" 
                    {...register('responseschema', {required: "Response Schema is required",
                        
                    })}/>
                    {errors.responseschema && <p>{errors.responseschema.message}</p>}
                </div>
                {/* <label>Response Schema</label>
                <textarea value={responseSchema} onChange={(event) => setResponseSchema(event.target.value)}/> */}
                <div>
                    <label htmlFor="url">URL of the service</label>
                    <input id="url" onChange={(event) => setUrl(event.target.value)}
                    {...register('url',{
                        required: "url is required",
                        validate: validateUrl
                    })}/>
                    {errors.url && <p>{errors.url.message}</p>}
                </div>
                {/* <label>URL of the Service</label>
                <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} required/> */}
                <button type="submit">Submit</button>
                {isValid === true && (<p className="success">Form is Valid!</p>)}
                {isValid === false && (<p className="fail">Form is invalid! Please check the input</p>)}
            </form>
        </div>
    </div>
)
};

export default Form;