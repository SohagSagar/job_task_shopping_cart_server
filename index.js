const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors =require('cors');
require('dotenv').config();
const port= process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());
//user:happy-shopping-cart
//pass:OR4yu3WB0YTWC9Cy

// https://peaceful-brushlands-64754.herokuapp.com/
// http://localhost:5000/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mqd5c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run =async()=>{
    try{
        await client.connect();
        console.log('db connected');
        
        //database collections
        const productCollection = client.db('happy-shopping-cart').collection('products');

        app.get('/products',async(req,res)=>{
            const result = await productCollection.find().toArray();
            res.send(result);
        })
        app.get('/products/:category',async(req,res)=>{
            const type=req.params.category;
            const filter= {category:type};
            const result=await productCollection.find(filter).toArray();
            res.send(result);
        })

        app.post('/products',async(req,res)=>{
            const data=req.body;
            const result= await productCollection.insertOne(data);
            res.send(result);
        })

    }

    finally{

    }


}

run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Happy shopping server is running')
});

app.listen(port,()=>{
    console.log('Happy shopping server is running at', port);
})


