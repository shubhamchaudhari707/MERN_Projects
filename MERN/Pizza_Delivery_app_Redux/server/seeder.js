const mogoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require('./db/conn')
const PizzaModel = require('./models/pizzaModels')
const pizzas = require('./data/pizza-data');


dotenv.config();
connectDB

//import data
const importData = async () =>{
    try {
        await PizzaModel.deleteMany()
        const sampleData = pizzas.map(pizza=>{return {...pizza}})
        await PizzaModel.insertMany(sampleData)
        console.log('data imported')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const dataDestroy = () => {};

if (process.argv[2] === "-d") {
    dataDestroy();
  } else {
    importData();
}




