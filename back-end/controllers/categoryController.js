const Category = require("../models/CategoryModel")
const imageValidate = require("../utils/imageValidate")

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({ name: "asc" }).orFail()
        return res.json(categories)
    }
    catch (error) {
        next(error)
    }
    res.send("Handling category routes, e.g. search for category")
}
const getCategoryById = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id)
        .orFail();
      res.json(category);
    } catch (err) {
      next(err);
    }
  };
const newCategory = async (req, res, next) => {
    try {
        //res.send(!!req.body)
        const { name,description } = req.body
        console.log("category:" + name)
        if (!name) {
            res.status(400).send("Category input is required")
        }
        const categoryExists = await Category.findOne({ name: name })

        if (categoryExists) {
            res.status(400).send("Category already exists")
        }
        else {
            const categoryCreated = await Category.create({
                name: name,
                description:description
            })
            res.json({
                message: "category created",
                categoryCreated: categoryCreated
            })
        }
    }
    catch (err) {
        next(err)
    }
}
const adminUpdateCategory = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id).orFail();
      const { name, description } =req.body;
      category.name = name || category.name;
      category.description = description || category.description;
      await category.save();
      res.json({
        message: "category updated",
      });
    } catch (err) {
      next(err);
    }
  };
const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId).orFail();
        await category.deleteOne();
        res.json({ message: "category removed" });
      } catch (err) {
        next(err);
      }
}
const saveAttr = async (req, res, next) => {

    const { key, val, categoryChosen } = req.body
    if (!key || !val || !categoryChosen) {
        return res.status(400).send("All inputs are required!")
    }
    else {
        try {
            const category = categoryChosen.split("/")[0]
            const categoryExists = await Category.findOne({ name: category }).orFail()
            if (categoryExists.attrs.length > 0) {
                var keyDoesNotExistInDatabase = true
                categoryExists.attrs.map((item, idx) => {
                    if (item.key === key) {
                        keyDoesNotExistInDatabase = false
                        var copyAttributeValues = [...item.value]
                        copyAttributeValues.push(val)
                        var newAttributeValues = [...new Set(copyAttributeValues)]
                        categoryExists.attrs[idx].value = newAttributeValues
                    }
                })
                if (keyDoesNotExistInDatabase) {
                    categoryExists.attrs.push({ key: key, value: [val] })
                }
            }
            else {
                //push to the array
                categoryExists.attrs.push({ key: key, value: [val] })
            }
            await categoryExists.save()
            let cat = await Category.find({}).sort({ name: "asc" })
            return res.status(201).json({ categoriesUpdated: cat })
        }
        catch (error) {
            next(error)
        }
    }
}
const adminUpload = async (req, res, next) => {
    if (req.query.cloudinary === "true") {
        try {
            let category = await Category.findById(req.query.categoryId).orFail();
            category.image=req.body.url;
            await category.save();
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
            "categories"
        );

        let category = await Category.findById(req.query.categoryId).orFail();

        let imagesTable = [];
        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images;
        } else {
            imagesTable.push(req.files.images);
        }

        for (let image of imagesTable) {
            var fileName = uuidv4() + path.extname(image.name);
            var uploadPath = uploadDirectory + "/" + fileName;
            category.images.push({ path: "/images/categories/" + fileName });
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        await category.save();
        return res.send("Files uploaded!");
    } catch (err) {
        next(err);
    }
};

const adminDeleteCategoryImage = async (req, res, next) => {
    const imagePath = decodeURIComponent(req.params.imagePath);
    if (req.query.cloudinary === "true") {
        try {
            await Category.findOneAndUpdate({ _id: req.params.categoryId }, { image:  imagePath }).orFail();
            return res.end();
        } catch (er) {
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
            { _id: req.params.categoryId },
            { images: { path: imagePath } }
        ).orFail();
        return res.end();
    } catch (err) {
        next(err);
    }
};

module.exports = { getCategories,getCategoryById, newCategory, deleteCategory, saveAttr, adminUpload, adminDeleteCategoryImage,adminUpdateCategory }