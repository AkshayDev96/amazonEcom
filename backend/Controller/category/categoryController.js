const CategoryModel = require("../../Model/category/categoryModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

//Add category by userid
exports.AddCategory = (req, res) => {
  const { name, logo } = req.body;
  //new category then add
  const user = new CategoryModel({name,logo,userid:objectId(req.user._id)});
  user.save()
    .then((data) => {
      return res.status(201).json({
        message: "New category is added!",success:true,data
      });
    }).catch(e => {
      if(e && e.code===11000){
        return res.status(400).json({
          message:`${name?name:'name'} is already exists!`,success:false
        })
      }
      console.log('Error in adding new category',e)
      return res.status(500).json({
        error: 'Error in adding new category',success:false
      })
    })
}

//Delete category by category id
exports.DeleteCategory = (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  CategoryModel.findByIdAndDelete({ _id }).then((data) => {
    if(!data){
      return res.status(404).json({
        success:false,error:'Category not found'
      })
    }

     return res.status(200).json({
        message: `Category - ${data?data.name:'Category'} is deleted!`,success:true
      })
    }).catch((e)=>{
      console.log('Error in deleting category',e)
      return res.status(500).json({success:false,error:'Error in deleting category'})
    }) 
}

//Get All category by userid
exports.GetCategory = (req, res) => {
  CategoryModel.find({userid:objectId(req.user._id)}).sort({createdAt:-1})
    .then(data => {
      return res.status(200).json({ data,success:true });
    })
    .catch(e => {
      console.log('Error in getting category',e)
      return res.status(500).json({
        error: 'Error in getting category',success:true
      });
    });
};

//Update category by category id
exports.UpdateCategory =  (req, res) => {
  const _id = objectId(req.params.id);
  let body = req.body;
  CategoryModel.updateOne({_id},{$set:body}).then((data) => {
    if(!data){
      return res.status(404).json({success:false,error:'Category not found'})
    }
    return CategoryModel.findById({_id}).then((c)=>{
      return res.status(200).json({message: `Category - ${body.name?body.name:'category'} is updated`,data:c,success:true})
    }).catch((e)=>{
      console.log(e)
      return res.status(500).json({
        error: 'Error in updating category',success:false
      })
    })
  }).catch(e => {
    if(e && e.code===11000){
      return res.status(400).json({
        message:`${body.name?body.name:'name'} is already exists!`,success:false
      });
    }
    console.log('Error in updating category',e)
    return res.status(500).json({
      error: 'Error in updating category',success:false
    })
  })
}