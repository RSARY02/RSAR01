export const saveData = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Data saved:', data);
            resolve({message: 'Data saved succesfully'});
        }, 1000)
    });
};

export const submitedOrder = (orderedServices) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Order submitted:', orderedServices);
            resolve({message: 'Order submitted successfully'});
        }, 1000)
    });
};