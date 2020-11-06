const mongoose = require('mongoose');
const { post } = require('request');
const Rest = mongoose.model('Restaurant');
  
const restaurantsCategory = async (req, res, next) => {
  try{
    const posts = await Rest.find().exec();
    //posts = new Set(posts);
    //const posts = await Rest.find().exec().distinct('category'); 
    res.status(200).json(posts);
  }catch(e){
    res.status(500).send(e);
  }   
} 
 
module.exports = { 
  restaurantsCategory
};