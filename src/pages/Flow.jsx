import React, {useState} from 'react';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import '../styles/flow.css';

const ItemType = 'SERVICE';

const DraggableService = ({service, index, moveService}) => {
    const[,ref]=useDrag({
        type: ItemType,
        item: {index},
    });

    const[,drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if(draggedItem.index!==index){
                moveService(draggedItem.index, index);
                draggedItem.index = index;
            }
        }
    });

    return(
        <div ref={(node) => ref(drop(node))} className='draggable-service'>{service.name}</div>
    )
}

const ServiceReorder = () => {
    const [services, setServices] = useState([
        {name:'Service 1'},
        {name:'Service 2'},
        {name:'Service 3'},
        {name:'Service 4'},
        {name:'Service 5'},
        {name:'Service 6'},
        {name:'Service 7'},
        {name:'Service 8'},
        {name:'Service 9'},
        {name:'Service 10'},
    ]);

    const moveService = (fromIndex, toIndex) => {
        const updatedServices = [...services];
        const [movedService] = updatedServices.splice(fromIndex,1);
        updatedServices.splice(toIndex,0,movedService);
        setServices(updatedServices);
    };

    const handleSubmit = () => {
        console.log('Submitted Order:', services);
    };


return(
    <DndProvider backend={HTML5Backend}>
        <div className='service-reorder-container'>
            <div className='service-list'>
                <h3>Services</h3>
                {services.map((service, index) => (
                    <DraggableService key={service.name} service={service} index={index} moveService={moveService}/>
                ))}
                </div>
                <div className='ordered-service-list'>
                    <h3>Ordered Services</h3>
                    {services.map((service, index) => (
                        <div key={service.name} className='ordered-service'>
                            {index+1}.{service.name}
                        </div>
                    ))}
                    <button onClick={handleSubmit} className='submit-button'>Submit Order</button>
                
            </div>
        </div>
    </DndProvider>
)
}

export default ServiceReorder;