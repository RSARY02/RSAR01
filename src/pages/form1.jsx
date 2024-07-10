import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { addServiceName } from '../utils/reducers';
import { saveData } from '../mocks/api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
// import './JsonValidationForm.css';
import '../styles/form.css'
 
const JsonValidationForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [submissionError, setSubmissionError] = useState(null);
  const dispatch = useDispatch()
  // const history = useHistory();

//   const validateUrl = (value) => {
//     const pattern = /^((ftp|http|https):\/\/)?www\.?([A-z]+)\.([A-z]{2,})/;
//     return pattern.test(value) || 'Provide valid url';
// }
 
  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log(data);
      
//       setServiceName(data.serviceName);
 
// const response = 
       await saveData(data);
      //  fetch('https://your-backend-url.com/endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      dispatch(addServiceName(data.serviceName));
      setIsSubmitted(true);
      // setSubmissionError(null);
      reset();
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
 
//       const responseData = await response.json();
//       console.log('Backend response:', responseData);

      
      // history.push('/flow1');
    } catch (error) {
      console.error('Error submitting form:', error);
      // setSubmissionError('Error submitting form');
    }
  };
 
  const validateJson = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };
 
  return (
    <Container maxWidth="sm">
    <Typography variant="h4" component="h2" gutterBottom>
      Adding a Service
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        id="serviceName"
        label="Service Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('serviceName', {
          required: 'Service name is required',
          validate: value => typeof value === 'string' || 'Service name must be a string'
        })}
        error={!!errors.serviceName}
        helperText={errors.serviceName?.message}
      />
               <TextField
          id="authorization"
          label="Authorization"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('authorization', {
            required: 'Authorization is required',
            validate: value => typeof value === 'string' || 'Authorization must be a string'
          })}
          error={!!errors.authorization}
          helperText={errors.authorization?.message}
        />
                {/* <label>Service Name</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} required/> */}
                 <TextField
          id="request"
          label="Request Schema - JSON"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          {...register('requestSchema', {
            required: 'Request schema is required',
            validate: {
              isValidJson: (value) => validateJson(value) || 'Invalid JSON format',
            },
          })}
          error={!!errors.requestSchema}
          helperText={errors.requestSchema?.message}
        />
                {/* <label>Request Schema</label>
                <textarea value={requestSchema} onChange={(event) => setRequestSchema(event.target.value)}/> */}
               <TextField
          id="response"
          label="Response Schema - JSON"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          {...register('responseSchema', {
            required: 'Response schema is required',
            validate: {
              isValidJson: (value) => validateJson(value) || 'Invalid JSON format',
            },
          })}
          error={!!errors.responseSchema}
          helperText={errors.responseSchema?.message}
        />
                {/* <label>Response Schema</label>
                <textarea value={responseSchema} onChange={(event) => setResponseSchema(event.target.value)}/> */}
               <TextField
          id="url"
          label="Health URL of the service"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('url', {
            required: 'URL is required',
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
              message: 'Enter a valid URL',
            },
          })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
                {/* <label>URL of the Service</label>
                <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} required/> */}
                {/* <button type="submit">Submit</button>
                {isValid === true && (<p className="success">Form is Valid!</p>)} */}
                {/* {isValid === false && (<p className="fail">Form is invalid! Please check the input</p>)} */}
            {/* </form>
            {submissionError &&  <p className="error-message">{submissionError}</p>}
    </div> */}
        <Button type="submit" variant="contained" sx={{backgroundColor:'#A100FF', color:"primary"}} fullWidth>
          Submit
        </Button>
      </form>
      {isSubmitted && <Alert severity="success">Form submitted successfully!</Alert>}
    </Container>
  );
};
 
// const mapDispatchToProps = {
//   addServiceName,
// };
 
export default (JsonValidationForm);