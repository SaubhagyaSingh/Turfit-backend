const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const { Turf, Group, Academy, Sport, History, User }
    = require('./models');
  
/* 
  get single sport,
  delete a sport,
  insert a sport
*/

//  get all sport,
app.get('/sports', async (req, res) => {
    try {
        const spar = await Sport.find();
        if (spar.length === 0) {
            return res.status(400).json({ error: 'couldnt find the sport' });
        }
        res.status(200).json({ message: 'found all the sport', spar });
    }
    catch (error) {
        console.error('Error retrieving the sport', error);
        res.status(500).json({ error: 'couldnt retrieve the sport' });
    }
});

//get sport by name 

app.get('/sports/:name', async (req, res) => {
    try {
        const sport = await Sport.findOne({ name: req.params.name });
        if (!sport) {
          return  res.status(404).json({ error: 'no such sport exists' });
        }
        res.status(200).json({ message: 'found the sport', sport });
    }
    catch (error) {
        console.error('Error retrieving the sport by name', error);
        res.status(500).json({ error: 'couldnt retrieve the sport' });
    }
});

// delete sport by name  

app.delete('/sports/:name', async (req, res) => {
    try {
        const sport = await Sport.deleteOne({ name: req.params.name });
        if (sport.deletedCount === 0) {
            return res.status(404).json({ error: 'no such sport exists' });
        }
        res.status(200).json({ message: 'deleted the sport', sport });
    }
    catch (error) {
        console.error('Error deleting  the sport', error);
        res.status(500).json({ error: 'couldnt delete the sport' });
    }
});

//insert by name 

app.post('/sports', async (req, res) => {
    try{ 
        const exist=await Sport.findOne({name:req.body.name}); 
        if(exist) 
        {
           return res.status(400).json({message:'sport already exist'}) ;
        }
        const newsport=new Sport({ 
            name:req.body.name, 
            equipments:req.body.equipments,
            duration:req.body.duration
        }) ;    
        const savedsport=await (newsport.save()); 
        res.status(201).json({message:'inserted the sport',newsport}); 
     }
    catch(error) 
    {
       console.error('Error inserting the sport',error) ;
       res.status(500).json({error:'Couldnt insert the sport'}); 
    }
});    
module.exports=app; 