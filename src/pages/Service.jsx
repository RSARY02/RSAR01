import React, {useEffect, useRef, useState} from 'react';
import "../styles/service.css"
// import {Tree} from 'react-tree-graph';
import {Tree} from 'react-d3-tree';


function ServiceDropdown(){
    const [services, setServices] = useState([
        {name: 'Service A', subServices: ['SubService A1', 'SubService A2']},
        {name: 'Service B', subServices: ['SubService B1', 'SubService B2']}
    ]);

    const [selectedService, setSelectedService] = useState(null);
    const [newService, setNewService] = useState("");
    const [newSubService, setNewSubService] = useState("");

    const treeContainer =useRef(null);

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
    }
    
    const getTreeData = () => {
        const treeData = {
            name: 'Services',
            children: services.map(service => ({
            name: service.name,
            children: service.subServices.map(subService => ({name: subService}))
        }))
      };
      console.log('Tree Data:',JSON.stringify(treeData, null, 2));
      return treeData;
    };
    // const getTreeData = () => {
    //     return (
    //         <Tree label="Services">
    //             {services.map((service, index)=> (
    //                 <TreeNode key={index} label={service.name}>
    //                     {service.subServices.map((subService, subIndex) => (
    //                         <TreeNode key={subIndex} label={subService}/>
    //                     ))}
    //                 </TreeNode>
    //             ))}
    //         </Tree>
    //     )
    // }

    useEffect(()=> {
        console.log('Updated Services:', services);
        console.log('Tree Data:', getTreeData());
    }, [services]);

    return(
        <div className='container'>
        <div className='content'>
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
                    <h3>{selectedService} Connected Services:</h3>
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
                    <button onClick={handleAddSubService}>Add Connected Service</button>
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
        <div className='graph-container'>
            <h3>Service Tree</h3>
            <div ref={treeContainer} className='tree-wrapper'>
            <Tree
              data={getTreeData()}
            //   orientation="vertical"
            //   translate={{ x:200, y:200 }}
            //   zoomable={true}
            //   nodeSize={{x:200, y: 100}}
            //   collapsible={true}
            //   initialDepth={1}
            translate={{
                x: treeContainer.current? treeContainer.current.clientWidth/2:0,
                y: 100,
            }}
            zoomable
            collapsible
              />
              
            {/* //   pathFunc="straight"
            //   height={400}
            //   width={600}
            //   animated
            //   svgProps */}
            </div>
        </div>
        </div>
    );
}

export default ServiceDropdown;