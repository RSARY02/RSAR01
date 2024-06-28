import React, {useState} from 'react';
import "../styles/service.css"

function ServiceDropdown(){
    const [services, setServices] = useState([
        {name: 'Service A', subServices: ['SubService A1', 'SubService A2']},
        {name: 'Service B', subServices: ['SubService B1', 'SubService B2']}
    ]);

    const [selectedService, setSelectedService] = useState(null);
    const [newService, setNewService] = useState("");
    const [newSubService, setNewSubService] = useState("");

    const handleServiceChange = (event) =>{
        setSelectedService(event.target.value);
        // if(value === 'addService'){
        //     setSelectedService(null);
        // } else{
        //  setSelectedService(JSON.parse(value));
        // }
    };

    const handleAddService = () => {
        if(newService.trim()!=="" && !services.some(service => service.name === newService)){
            const updatedServices = [...services,
                {name: newService, subServices: []}];
                setServices(updatedServices);
                setNewService("");
                setSelectedService(newService);
        }
    };

    const handleAddSubService = () =>{
        if(newSubService.trim()!=="" && selectedService){
            const updatedServices= services.map((service) =>{
                if(service.name === selectedService && !service.subServices.includes(newSubService)){
                    return { ...service, subServices: [...service.subServices, newSubService]};
                }
                return service;
            });
            setServices(updatedServices);
            setNewSubService('');
        }
    };

    return(
        <div className='container'>
            <h2>Select a Service</h2>
            <select value={selectedService} onChange={handleServiceChange}>
                <option value="">Select a service...</option>
                {services.map((service, index) => (
                    <option key={index} value={service.name}>
                        {service.name}
                    </option>
                ))}
                <option value="addservice">Add Service...</option>
            </select>
            {selectedService === 'addservice' ? (
                <div className='add-service'>
                    <h3>Add a new service</h3>
                    <input type="text" value={newService} 
                     onChange={(e) => setNewService(e.target.value)}
                     placeholder='Enter  service name'/>
                     <button onClick={handleAddService}>Add Service</button>
                     </div>
            ) : selectedService && (
                <div className='sub-services'>
                    <h3>{selectedService} Sub Services:</h3>
                    <ul>
                        {services
                        .find((service) => service.name === selectedService)
                        .subServices.map((subServices, index) => (
                            <li key={index}>{subServices}</li>
                        ))}
                    </ul>
                    <input
                      type="text"
                      value={newSubService}
                      onChange={(e) => setNewSubService(e.target.value)}
                      placeholder="Add new sub-service"/>
                    <button onClick={handleAddSubService}>Add Sub-Service</button>
                </div>
            )}
            
            
            {!selectedService &&(
            <div>
                <h3>Current Services:</h3>
                <ul>
                    {services.map((service, index) => (
                        <li key={index} className='service'>
                            <strong>{service.name}</strong>
                            {service.subServices.length > 0 &&(
                            <ul>
                                {service.subServices.map((subService, subIndex) => (
                                    <li key={subIndex}>{subService}</li>
                                ))}
                            </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    );
}

export default ServiceDropdown;