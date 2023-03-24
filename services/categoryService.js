// ...rest of the initial code omitted for simplicity.

const asyncHandler = require('express-async-handler')

const slugify = require('slugify')
const categoryModel =  require('../models/categoryModel')
const ApiError = require('../utils/apiError')

//... services when add logic ---






// @desc Create category
// @route POST /api/v1/categoriies
// @access Privet
exports.addtCategory = asyncHandler(async (req,res )=>{

    const   name  = req.body.name;

 const category = await  categoryModel.create({name ,slug:slugify(name)})
  res.status(201).json({data : category})
 
     


  }
)
 
  


// @desc get All category
// @route GET /api/v1/categoriies
// @access Privet
exports.getCategories =asyncHandler(async (req,res)=>{
   
    // pagination
       const page =  req.query.page * 1 || 1;
       const limit = req.query.limit * 1 || 5;
       const skip = (page - 1) * limit;
     

   const category = await   categoryModel.find({}).skip(skip).limit(limit);

   res.status(201).json({results : category.length , page, data:category})

    

}
)

// @desc get Spicific  category
// @route GET /api/v1/categoriies/:id
// @access Privet
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;


  const category = await categoryModel.findById(id)
  if (!category) {
    // res.status(404).json({msg:`no category for this id : ${id}`})
    return next(new ApiError(`no category for this id : ${id}`, 404))
  }
  res.status(200).json({ data: category })



}
)




// @desc update category
// @route PUT /api/v1/categoriies/:id
// @access Privet
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const name = req.body.name;

  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    // res.status(404).json({msg:`no category for this id : ${id}`})
    return next(new ApiError(`no category for this id : ${id}`, 404))

  }
  res.status(200).json({ data: category })

}
)





// @desc deley category
// @route PUT /api/v1/categoriies/:id
// @access Privet
exports.deletCategory = asyncHandler(async (req,res , next)=>{

    const {id} = req.params;
    

    
    const  category = await  categoryModel.findByIdAndDelete(id)
         
       if(!category){
        // res.status(404).json({msg:`no category for this id : ${id}`})
        return   next( new ApiError(`no category for this id : ${id}` , 404))

   }
   res.status(201).json({ data:category})

      }
    )
     









    //v2

    // exports.addtCategory = async (req,res)=>{
    //     try {
    //       const   name  = req.body.name;
    
    //     category = await  categoryModel.create({name ,slug:slugify(name)})
    //     res.status(201).json({data : category})
       
           
    
            
    //     } catch (error) {
    //         res.status(400).send(error)
    //     }
    //     }
    
     


// v!

// exports.addtCategory =  (req,res)=>{
//     try {
//       const   name  = req.body.name;

//        const newCategory  =  new categoryModel({name})
       
//        newCategory.save()

//     res.status(200).send(newCategory)
    
//     } catch (error) {
//         res.status(400).send(error)
//     }
//     }
    
// exports.getCategory = async (req,res)=>{
//     try {
//         const ido = req.params.id
     

//    const categoy = await   categoryModel.find()

//     res.status(200).send(categoy)
    
//     } catch (error) {
//         res.status(400).send(error)
//     }
//     }