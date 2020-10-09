const express = require('express');
const app=express();

const {mongoose}=require('./db/mongoose');

const bodyParser=require('body-parser');

//load into the mongoose models
const {List,Task}=require('./db/models');

//load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});



/*Route HANDLERS */

/*LIST ROUTES */

/****
 * GET/LIST
 * PURPOSE IS TO GET ALL LISTS
 */
app.get('/lists',(req,res)=>{
    //GET ALL THE LISTS FROM THE DATABASE
   
    List.find().then((lists)=>{
        res.send(lists);
    }).catch((e)=>{
        res.send(e);
    });
})

/**
 * POST/LIST
 * PURPOSE TO CREATE NEW LISTS
 */
app.post('/lists',(req,res)=>{
     //CREATE NEW LIST
     //PASSED IT VIA JSON BODY
     let title =req.body.title;

     let newList=new List({
         title
     });
     newList.save().then((listDoc)=>{
         //returns the full list document
       res.send(listDoc);
     });
});


/**
 * PATH /LISTS/:ID
 * PURPOSE UPDATE A SPECIFIED LIST
 */

app.patch('/lists/:id', (req, res) => {
    // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete('/lists/:id', (req, res) => {
    // We want to delete the specified list (document with id in the URL)
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});

/**
 * /list/:id/tasks
 * get the task of a specific list
 */
app.get('/lists/:idlist/tasks',(req,res)=>{
    Task.find({_listId:req.params.idlist}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.send(e);
    })
})

/**
 * /list/:id/tasks
 * post the task to a specific list
 */

app.post('/lists/:listId/tasks',(req,res)=>{
    
    let newTask=new Task({
        title:req.body.title,
        _listId:req.params.listId
    });
    newTask.save().then((task)=>{
        res.send(task);
    }).catch((e)=>{
        res.send(e);
    })
})

/**
 * update a specific task in a specific list
 * /lists/:idlist/tasks/idTask
 */
app.patch('/lists/:listId/tasks/:tasksId',(req,res)=>{
    Task.findOneAndUpdate({_id:req.params.tasksId,
        _listId:req.params.listId},{$set:req.body}).then((updatedTaskRes)=>{
            res.send(updatedTaskRes);
        }).catch((e)=>{res.send(e);})
})

app.delete('/lists/:listId/tasks/:tasksId',(req,res)=>{
    Task.findOneAndRemove({_id:req.params.tasksId,
    _listId:req.params.listId
    }).then(()=>res.sendStatus(200));
})


app.listen(3200,()=>{
    console.log("working on port 3200");
})