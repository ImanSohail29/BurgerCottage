const Customer = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const FoodItem = require("../models/FoodItemModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

const getUsers = async (req, res, next) => {
  try {
    const users = await Customer.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, phoneNumber, address, password } = req.body;
    if (!(name && phoneNumber && password)) {
      return res.status(400).send("All inputs are required");
    }
console.log( name+ phoneNumber+ address+ password )
    const userExists = await Customer.findOne({ phoneNumber });
    console.log( JSON.stringify(userExists) )
    if (userExists&&userExists.password!=="1111") {
      return res.status(400).send("user exists");
    } else if(userExists.password==="1111"){
      const hashedPassword = hashPassword(password);
      userExists.name = name || userExists.name;
      userExists.address = address || userExists.address;
      userExists.password = hashedPassword
      await userExists.save();
      res .status(201)
      .json({
        success: "User created",
        userCreated: {
          _id: userExists._id,
          name: userExists.name,
          phoneNumber: userExists.phoneNumber,
          isAdmin: userExists.isAdmin,
        },
      });
    }
    else {
      const hashedPassword = hashPassword(password);
      const user = await Customer.create({
        name,
        phoneNumber,
        address,
        password: hashedPassword,
      });
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.phoneNumber,
            user.isAdmin
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};
const registerUserFromAdmin = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, address } = req.body;

    const isAdmin = false;
    const userExists = await Customer.findOne({ phoneNumber: phoneNumber });
    if (userExists) {
      userExists.address = address || userExists.address;
      await userExists.save();
      res.send({ userCreated: { _id: userExists._id } });
    } else {
      const user = await Customer.create({
        name,
        phoneNumber,
        email,
        address,
        isAdmin
      });
      console.log("Hi there you:"+user)
      res.status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { phoneNumber, password, doNotLogout } = req.body;
    if (!(phoneNumber && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await Customer.findOne({ phoneNumber }).orFail();
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
      }

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.phoneNumber,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.params.userId).orFail();
    return res.send(user);
  } catch (err) {
    next(err)
  }
}

const writeReview = async (req, res, next) => {
  try {

    const session = await Review.startSession();

    // get comment, rating from request.body:
    const { comment, rating } = req.body;
    // validate request:
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    // create review id manually because it is needed also for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = ObjectId();

    session.startTransaction();
    await Review.create([
      {
        _id: reviewId,
        comment: comment,
        rating: Number(rating),
        user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
      }
    ], { session: session })

    const foodItem = await FoodItem.findById(req.params.foodItemId).populate("reviews").session(session);

    const alreadyReviewed = foodItem.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("foodItem already reviewed");
    }

    let prc = [...foodItem.reviews];
    prc.push({ rating: rating });
    foodItem.reviews.push(reviewId);
    if (foodItem.reviews.length === 1) {
      foodItem.rating = Number(rating);
      foodItem.reviewsCount = 1;
    } else {
      foodItem.reviewsCount = foodItem.reviews.length;
      let ratingCalc = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / foodItem.reviews.length;
      foodItem.rating = Math.round(ratingCalc)
    }
    await foodItem.save();

    await session.commitTransaction();
    session.endSession();
    res.send('review created')
  } catch (err) {
    await session.abortTransaction();
    next(err)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.params.userId).select("name phoneNumber isAdmin").orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.params.userId).orFail();

    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.isAdmin = req.body.isAdmin

    await user.save();

    res.send("user updated");

  } catch (err) {
    next(err);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.params.userId).orFail();
    await user.remove();
    res.send("user removed");
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser, registerUserFromAdmin };
