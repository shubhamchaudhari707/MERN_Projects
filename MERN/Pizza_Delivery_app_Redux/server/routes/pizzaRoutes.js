const express = require('express')
const router = express.Router()
const pizzaModel = require('../models/pizzaModels')


//get All pizzas
router.get('/getAllPizzas', async(req, res)=>{
    try {
        const pizzas = await pizzaModel.find({})
        res.status(200).send(pizzas)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error
        })
    }
})


//addpizzas
router.post('/addpizza', async(req, res)=>{
    try {
        const {pizza} = req.body;

        const newPizza = new pizzaModel({
            name:pizza.name,
            image:pizza.image,
            varients:['small', 'medium', 'large'],
            description:pizza.description,
            category:pizza.category,
            prices:[pizza.prices]
        })
        await newPizza.save()
        console.log(newPizza)
        res.status(201).send("New Pizza Added")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error
        })
    }
})


//
router.post('/getpizzabyid', async(req, res)=>{
    try {
        const pizzaId = req.body.pizzaId;
        const pizza = await pizzaModel.findOne({_id:pizzaId});
        res.send(pizza)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error
        })
    }
})


router.post('/updatepizza', async(req, res)=>{
    try {
        const updatedPizza = req.body.updatedPizza;

        const pizza = await pizzaModel.findOne({_id:updatedPizza});
        (pizza.name = updatedPizza.name),
        (pizza.description = updatedPizza.description),
        (pizza.image = updatedPizza.image),
        (pizza.category = updatedPizza.category),
        (pizza.prices = [updatedPizza.prices]);
        await pizza.save();

        res.status(200).send("Pizza Update Success");
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:error
        })
    }
})

router.post("/deletepizza", async (req, res) => {
    const pizzaId = req.body.pizzaId;
    try {
      await pizzaModel.findOneAndDelete({ _id: pizzaId });
      res.status(200).send("Pizza Deleted");
    } catch (error) {
      res.status(404).json({ message: error });
    }
});

module.exports = router;


