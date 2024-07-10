import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { submitedOrder } from '../mocks/api';
import { Container, Paper, Grid, Button, Typography, Box } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// import { setServiceOrder } from '../utils/actions';
// import './ServiceReorder.css';
import '../styles/flow.css'
 
const ItemType = 'SERVICE';
 
const DraggableService = ({ service, index, moveService }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });
 
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveService(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
 
  return (
    <Paper ref={(node) => ref(drop(node))} sx={{padding: 1, marginBottom: 1}}>
      {service.name}
    </Paper>
  );
};
 
const ServiceReorder = ({ serviceNames }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(serviceNames.map(name => ({name})));
  }, [serviceNames])
  // const history = useHistory();
 
  const moveService = (fromIndex, toIndex) => {
    const updatedServices = [...services];
    const [movedService] = updatedServices.splice(fromIndex, 1);
    updatedServices.splice(toIndex, 0, movedService);
    setServices(updatedServices);
  };
 
  const handleSubmit = async() => {
//     try {
// const response = await fetch('https://your-backend-url.com/submitServiceOrder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(services),
//       });
 
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
 
//       const responseData = await response.json();
//       console.log('Submitted order:', responseData);
 
//       setServiceOrder(services);
      // history.push('/next-page');
//     } catch (error) {
//       console.error('Error submitting service order:', error);
//     }
// console.log('Submitted order:', services);
try{
  await submitedOrder(services);
  // new Promise((resolve) => setTimeout(resolve, 1000));
  // console.log('order submitted successfully');
}catch(error){
  console.log('Error submitting order:', error);
}
  };
 
  return (
    // <DndProvider backend={HTML5Backend}>
    //   <div className="service-reorder-container">
    //     <div className="service-list">
    //       <h3>Services</h3>
    //       {services.map((service, index) => (
    //         <DraggableService key={service.name} service={service} index={index} moveService={moveService} />
    //       ))}
    //     </div>
    //     <div className="ordered-service-list">
    //       <h3>Ordered Services</h3>
    //       {services.map((service, index) => (
    //         <div key={service.name} className="ordered-service">
    //             {index + 1}. {service.name}
    //         </div>
    //       ))}
    //       <button onClick={handleSubmit} className="submit-button">Submit Order</button>
    //     </div>
    //   </div>
    // </DndProvider>
    <DndProvider backend={HTML5Backend}>
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Services
          </Typography>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, minHeight: 300 }}>
            {services.map((service, index) => (
              <DraggableService key={service.name} service={service} index={index} moveService={moveService} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Ordered Services
          </Typography>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, minHeight: 300 }}>
            {services.map((service, index) => (
              <Paper key={service.name} sx={{ padding: 1, marginBottom: 1 }}>
                {index + 1}. {service.name}
              </Paper>
            ))}
          </Box>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Submit Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  </DndProvider>
  );
};
 
const mapToProps = (state) => ({
  serviceNames: state.services.serviceNames,
});
 
// const mapDispatchToProps = {
//   setServiceOrder,
// };
 
export default connect(mapToProps)(ServiceReorder);
// connect(mapStateToProps, mapDispatchToProps)