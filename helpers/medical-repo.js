const fs = require('fs');

let medicals = require('data/medicals.json');

export const medicalsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return medicals;
}

function getById(id) {
    return medicals.find(x => x.id.toString() === id.toString());
}

function create({ description, results, remarks }) {
    const medical = { description, results, remarks };

    // validate
    //if (medicals.find(x => x.email === medical.email))
    //    throw `Medical issue with the email ${medical.email} already exists`;

    // generate new aMedical id
    medical.id = medicals.length ? Math.max(...medicals.map(x => x.id)) + 1 : 1;

    // set date created and updated
    medical.dateCreated = new Date().toISOString();
    medical.dateUpdated = new Date().toISOString();

    // add and save aMedical
    medicals.push(medical);
    saveData();
}

function update(id, { description, results, remarks }) {
    const params = { description, results, remarks };
    const medical = medicals.find(x => x.id.toString() === id.toString());

    // validate
    //if (params.email !== medical.email && medicals.find(x => x.email === params.email))
    //    throw `aMedical with the email ${params.email} already exists`;

    // only update password if entered
    //if (!params.password) {
    //    delete params.password;
    //}

    // set date updated
    medical.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(medical, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted aMedical and save
    medicals = medicals.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/medicals.json', JSON.stringify(medicals, null, 4));
}