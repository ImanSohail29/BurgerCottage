const ObjectId = require("mongodb").ObjectId

const foodItems=[
{
    name:'Zinger Paratha',
    category:'Paratha Roll',
    description:'Crunchy outside, creamy inside',
    image:{path:'https://res.cloudinary.com/dyqklwu1n/image/upload/t_FoodItemImages/v1702380898/BurgerCottage/zinger_paratha_roll_zffwfr.jpg'},
    attributes:[{"size":[{"medium":{"price":350}},{"large":{"price":400}}]}],
    addOns:[{'cheese':{price:50}},{'corn':{price:30}}],
    price:'',
    ingredients:[],
    quantity:'',
    reviews:[],
    reviewsCount:0,
    rating:0,
},
{
    name:'Bar B Q Paratha',
    category:'Paratha Roll',
    description:'Crunchy outside, creamy inside',
    image:{path:'https://res.cloudinary.com/dyqklwu1n/image/upload/t_FoodItemImages/v1702380898/BurgerCottage/zinger_paratha_roll_zffwfr.jpg'},
    attributes:[{"size":[{"medium":{"price":350}},{"large":{"price":400}}]}],
    addOns:[{'cheese':{price:50}},{'corn':{price:30}}],
    price:'',
    ingredients:[],
    quantity:'',
    reviews:[],
    reviewsCount:0,
    rating:0,
},
{
    name:'French Fries',
    category:'Fries',
    description:'Crunchy outside, soft inside',
    image:{path:'https://res.cloudinary.com/dyqklwu1n/image/upload/t_FoodItemImages/v1702389903/BurgerCottage/french_fries_dzduwt.jpg'},
    attributes:[{"size":[{"regular":{price:150}},{"large":{price:250}},{"family":{price:350}}]}],
    addOns:[{'mayo':{price:50}},{'corn':{price:30}}],
    price:'',
    ingredients:[],
    quantity:'',
    reviews:[],
    reviewsCount:0,
    rating:0,
}]

module.exports=foodItems