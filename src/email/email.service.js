'use strict'



const validate = (data) => {

    return true;
};

const prepareEmailAddresses = (emailAddresses) => {
    let items = [];
    if (emailAddresses) { 
        items = emailAddresses.split(',');
        items = items.map(item => item.trim());
    }

    return items;
};

module.exports = {
    validate,
    prepareEmailAddresses
};