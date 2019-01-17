const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//Get Orders


// Get users
router.get('/orders', (req, res) => {
    const uri = "mongodb+srv://waleedumer_dev:WiDiiii4@free-aws-cluster-74bpk.mongodb.net/friesFactory?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("friesFactory").collection("items_Counter");
 
        function getNextSequenceValue(sequenceName){
            var query = {_id: sequenceName}
                var sequenceDocument = client.db("friesFactory").collection("items_Counter")
                .findOneAndUpdate(query,{$inc:{sequence_value:1}},{new:true});        
                return sequenceDocument;
        }   
        getNextSequenceValue('itemId');
        collection.find()
            .toArray()
            .then((collection) => {
                response.data = collection;
                res.json(response);    
            })
            .catch((err) => {
                sendError(err, res);
            });
            client.close();
     });

});

router.get('/getorders', (req, res) => {
    const uri = "mongodb+srv://waleedumer_dev:WiDiiii4@free-aws-cluster-74bpk.mongodb.net/friesFactory?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("friesFactory").collection("orders");
        var date = new Date();
        var orderDate = date.getDate() + "/"
                        + (date.getMonth()+1)  + "/" 
                        + date.getFullYear();
        collection.find({ "order_date": orderDate })
            .toArray()
            .then((collection) => {
                response.data = collection;
                res.json(response);    
            })
            .catch((err) => {
                sendError(err, res);
            });
            client.close();
     });

});


router.get('/getorderById', (req, res) => {
    const uri = "mongodb+srv://waleedumer_dev:WiDiiii4@free-aws-cluster-74bpk.mongodb.net/friesFactory?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("friesFactory").collection("orders");
        var date = new Date();
        var orderDate = date.getDate() + "/"
                        + (date.getMonth()+1)  + "/" 
                        + date.getFullYear();
                        // console.log(req.params);
                        console.log(req.query.orderId);
                        let id = req.query.orderId;
        collection.find({ "orderId": parseInt(req.query.orderId) })
            .toArray()
            .then((collection) => {
                response.data = collection;
                console.log(response);
                res.json(response);    
            })
            .catch((err) => {
                sendError(err, res);
            });
            client.close();
     });

});



router.post('/insertorders', (req, res) => {
    console.log("orders")
    console.log(req.body.items);
    const uri = "mongodb+srv://waleedumer_dev:WiDiiii4@free-aws-cluster-74bpk.mongodb.net/friesFactory?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    
    const collection = client.db("friesFactory").collection("orders");
        insertOrder(req.body.orderId, req.body.amount, req.body.items, req.body.orderDate, req.body.deliveryBy);
        
    function insertOrder(orderId,amount, items, orderDate, deliveryBy){
        client.db("friesFactory").collection("orders")
        .insertOne({orderId: orderId, order_date: orderDate, deliveryBy: deliveryBy, amount: amount, items: items});
    }
    

    
     });

});

module.exports = router;
