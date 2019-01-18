const express = require('express');
const configureMiddleware = require('./config/middleware');
const dbProject = require('./helpers/projectHelpers');
const dbActions = require('./helpers/actionHelpers');



const server = express();

//middleware 
configureMiddleware(server);

//routes 

server.get('/', (req, res) => {
    res.send('And God saw all that He had made, and found it very good');
});

// Project routes
const getAllProjects = (req, res) => {
    dbProject.get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: ` Failed to get Project`, error: err });
        });
}

const getProject = (req, res) => {
    dbProject.get(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to get Project`, error: err });
        });
}


const addProject = (req, res) => {
    if (req.body.name === undefined || req.body.description === undefined) {
        res.status(400).json({ message: "name and notes for the action are required." });
        return;
    }

    dbProject.insert(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to save Project", error: err });
        });
}

const getActionsOfProject = (req, res) => {
    const { id } = req.params;
    dbProject.getProjectActions(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: `Could not find Actions of the Project with ${id}`, error: err });
        });
}

// Project end points 
server.get('/project', getAllProjects);
server.get('/project/:id', getProject);
server.post('/project', addProject);
server.get('/project/:id/actions', getActionsOfProject);

// Actions routes

const getAllActions = (req, res) => {
    dbActions.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get Actions.', error: err });
        });
}

const getActionById = (req, res) => {
    dbActions.get(req.params.id)
        .then(post => {
            console.log(post)
            if (post.length !== 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: `Failed to get Action with specific ID: ${req.params.id} does not exist` });
            }
        })
        .catch(err => {
            res.status(500).json({ message: `The Action with id: ${req.params.id} could not be retrieved.`, error: err });
        });
}

const addNewAction = (req, res) => {
    if (req.body.project_id === undefined || req.body.description === undefined || req.body.notes === undefined) {
        res.status(400).json({ message: "description and notes for the action are required." });
        return;
    }

    dbActions.insert(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to save Action", error: err });
        });
}

//Post end points
server.get('/actions', getAllActions);
server.get('/actions/:id', getActionById);
server.post('/actions', addNewAction);






module.exports = server
