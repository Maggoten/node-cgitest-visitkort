const Employee = require('../models/employee.model.js');

// Create and Save employee
exports.create = (req, res) => {
    if(!req.body.telephone || !req.body.email) {
        return res.status(400).send({
            message: "Employee telephone or email can't be empty"
        });
    }

    // Create a Employee
    const employee = new Employee({
        name: req.body.name || "No name on this one ", 
        surName: req.body.surName || "No surname on this one",
        telephone: req.body.telephone,
        email: req.body.email,
        image: req.body.image
    });

    // Save Employee in the db
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error happend when creating Employee."
        });
    });
};

// Get all employees from the db.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error happend getting employees."
        });
    });
};

// Find employee with a id
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "noone found with id " + req.params.employeeId
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "noone found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error getting employee with id " + req.params.employeeId
        });
    });
};

// Update employee with the employeeId in the request
exports.update = (req, res) => {
    // Checking okey
    if(!req.body.telephone) {
        return res.status(400).send({
            message: "Employee telephone can't be empty"
        });
    }

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {
        name: req.body.name || "No name Employee",
        telephone: req.body.telephone
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "noone found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "noone found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
        });
    });
};

// Delete employee with id in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "noone found with id" + req.params.employeeId
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "noone found with id" + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could't delete employee with that id " + req.params.employeeId
        });
    });
};
