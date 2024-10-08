const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const FoodItem = require("../models/FoodItemModel");
const AddOn = require("../models/AddOnModel");
const Discount = require("../models/DiscountModel");

const getFoodItems = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
        queryCondition=true
        categoryQueryCondition = {
        category: categoryName
      };
    }   
    //pagination
    const pageNum = Number(req.query.pageNum) || 1;

    if (queryCondition) {
        query = { $and: [categoryQueryCondition] }
    }
console.log(query)
    const totalFoodItems = await FoodItem.countDocuments(query);
    let select = {};
    const foodItems = await FoodItem.find(query)
      .select(select)
      .populate("addOns")
      .skip(recordsPerPage * (pageNum - 1))
      .limit(recordsPerPage);

    res.json({
      foodItems,
      pageNum,
      paginationLinksNumber: Math.ceil(totalFoodItems / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

const getFoodItemById = async (req, res, next) => {
  
  try {
    const foodItem = await FoodItem.findById(req.params.id)
      .populate("reviews")
      .populate("addOns")
      .orFail();
    res.json(foodItem);
  } catch (err) {
    next(err);
  }
};
const getDiscountById = async (req, res, next) => {
  
  try {
    const discount = await Discount.findById(req.params.discountId)
      .orFail();
    res.json(discount);
  } catch (err) {
    next(err);
  }
};

const getBestsellers = async (req, res, next) => {
  try {
    const foodItems = await FoodItem.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $replaceWith: "$doc_with_max_sales" },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, image: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]);
    res.json(foodItems);
  } catch (err) {
    next(err);
  }
};

const adminGetFoodItems = async (req, res, next) => {
  try {
    const foodItems = await FoodItem.find({})
      .populate("addOns")
      .sort({ category: 1 })
      .select("name price category");
    return res.json(foodItems);
  } catch (err) {
    next(err);
  }
};
const adminGetFoodItemsByCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.categoryName || "";
    const foodItems = await FoodItem.find({category:categoryName})
      .populate("addOns")
      .select("name price category");
    return res.json(foodItems);
  } catch (err) {
    next(err);
  }
};


const adminDeleteFoodItem = async (req, res, next) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id).orFail();
    await foodItem.deleteOne();
    res.json({ message: "food Item removed" });
  } catch (err) {
    next(err);
  }
};

const adminCreateFoodItem = async (req, res, next) => {
  try {
    const foodItem = new FoodItem();
    const { name,category, description,size,addOns  } =req.body;
    console.log(name,category, description,size,addOns )
    foodItem.name = name;
    foodItem.category = category;
    foodItem.description = description;
    foodItem.addOns = addOns;
    foodItem.size = size.sort();


    await foodItem.save();

    res.json({
      message: "food Item created",
      foodItemId: foodItem._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateFoodItem = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const foodItem = await FoodItem.findById(req.params.id).orFail();
    console.log(foodItem)
    const { name,category, description,size,addOns } =req.body;
    foodItem.name = name || foodItem.name;
    foodItem.category = category || foodItem.category;
    foodItem.description = description || foodItem.description;
    foodItem.size=size||foodItem.size;
    foodItem.addOns=addOns||foodItem.addOns;
    await foodItem.save();
    res.json({
      message: "food Item updated",
    });
  } catch (err) {
    next(err);
  }
};
const adminUpdateDiscount = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const discount = await Discount.findById(req.params.discountId).orFail();
    console.log(discount)
    const { figure, description } =req.body;
    discount.figure = figure || discount.figure;
    discount.description = description || discount.description;
    const discountCreated=await discount.save();
    res.json({
      data:discountCreated,
      message: "discount updated",
    });
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
    if (req.query.cloudinary === "true") {
        try {
            let foodItem = await FoodItem.findById(req.query.foodItemId).orFail();
            foodItem.image=new Object()
            foodItem.image.path=req.body.url;
            await foodItem.save();
        } catch (err) {
            next(err);
        }
       return 
    }
  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectory = path.resolve(
      __dirname,
      "../../front-end",
      "public",
      "images",
      "foodItems"
    );

    let foodItem = await FoodItem.findById(req.query.foodItemId).orFail();

    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectory + "/" + fileName;
      foodItem.images.push({ path: "/images/foodItems/" + fileName });
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await foodItem.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

const adminDeleteFoodItemImage = async (req, res, next) => {
    const imagePath = decodeURIComponent(req.params.imagePath);
    if (req.query.cloudinary === "true") {
        try {
           await FoodItem.findOneAndUpdate({ _id: req.params.foodItemId },  { image: { path: null } } ).orFail(); 
            return res.end();
        } catch(er) {
            next(er);
        }
        return
    }
  try {
    const path = require("path");
    const finalPath = path.resolve("../front-end/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await FoodItem.findOneAndUpdate(
      { _id: req.params.foodItemId },
      {  image: { path: imagePath } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};
const discountAdminUpload = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
      try {
          let discount = await Discount.findById(req.query.discountId).orFail();
          discount.image=req.body.url;
          await discount.save();
      } catch (err) {
          next(err);
      }
     return 
  }
try {
  if (!req.files || !!req.files.images === false) {
    return res.status(400).send("No files were uploaded.");
  }

  const validateResult = imageValidate(req.files.images);
  if (validateResult.error) {
    return res.status(400).send(validateResult.error);
  }

  const path = require("path");
  const { v4: uuidv4 } = require("uuid");
  const uploadDirectory = path.resolve(
    __dirname,
    "../../front-end",
    "public",
    "images",
    "discount"
  );

  let foodItem = await FoodItem.findById(req.query.foodItemId).orFail();

  let imagesTable = [];
  if (Array.isArray(req.files.images)) {
    imagesTable = req.files.images;
  } else {
    imagesTable.push(req.files.images);
  }

  for (let image of imagesTable) {
    var fileName = uuidv4() + path.extname(image.name);
    var uploadPath = uploadDirectory + "/" + fileName;
    foodItem.image.push({ path: "/images/foodItems/" + fileName });
    image.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }
  await foodItem.save();
  return res.send("Files uploaded!");
} catch (err) {
  next(err);
}
};

const discountAdminDeleteImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  if (req.query.cloudinary === "true") {
      try {
         await Discount.findOneAndUpdate({ _id: req.params.discountId },  { image: null } ).orFail(); 
          return res.end();
      } catch(er) {
          next(er);
      }
      return
  }
try {
  const path = require("path");
  const finalPath = path.resolve("../front-end/public") + imagePath;

  const fs = require("fs");
  fs.unlink(finalPath, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
  await FoodItem.findOneAndUpdate(
    { _id: req.params.discountId },
    { images:imagePath }
  ).orFail();
  return res.end();
} catch (err) {
  next(err);
}
};
const getAddOns = async (req, res, next) => {
  try {
      const addons = await AddOn.find({}).sort({ name: "asc" }).orFail()
      return res.json(addons)
  }
  catch (error) {
      next(error)
  }
  res.send("Handling add ons routes, e.g. search for addons")
}

module.exports = {
  getFoodItems,
  getFoodItemById,
  getDiscountById,
  getBestsellers,
  adminGetFoodItems,
  adminDeleteFoodItem,
  adminCreateFoodItem,
  adminUpdateFoodItem,
  adminUpdateDiscount,
  adminUpload,
  adminDeleteFoodItemImage,
  adminGetFoodItemsByCategory,
  discountAdminUpload,
  discountAdminDeleteImage,
  getAddOns
};
