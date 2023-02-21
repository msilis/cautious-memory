const express = require("express");
const router = express.Router();
const Car = require("../models/car");

//Get all cars from database

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    console.log("This came from Car.find()")
    res.json(cars);
  } catch (err) {
    console.log("This came from Car.find() error")
    res.status(500).json({ message: err.message });
  }
});

//Get one car from database

router.get("/:id", getCarById, (req, res) => {
  res.send(res.car);
});

//Add one car to database

router.post("/", async (req, res) => {
  //Grab info from body and send to database
  const car = new Car({
    modelYear: req.body.modelYear,
    make: req.body.make,
    currentOwner: req.body.currentOwner,
    registration: req.body.registration,
    address: req.body.registration,
  });
  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Modify one car in database
router.patch("/:id", getCarById, async (req, res) => {
  //First check which field is being updated
  if (req.body.modelYear != null) {
    res.car.modelYear = req.body.modelYear;
  }
  if (req.body.make != null) {
    res.car.make = req.body.make;
  }
  if (req.body.currentOwner != null) {
    res.car.currentOwner = req.body.currentOwner;
  }
  if (req.body.registration != null) {
    res.car.registration = req.body.registration;
  }
  if (req.body.address != null) {
    res.car.address = req.body.address;
  }
  try {
    const updateCar = await res.car.save();
    res.status(201).json(updateCar);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Modify multiple cars in database
router.patch("/", async (req, res) => {
  try {
    const modifyCar = await Car.updateMany(
      { currentOwner: req.body.oldValue },
      { $set: { currentOwner: req.body.newValue } }
    );
    res.json(modifyCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Filter by year
router.get("/filter", async (req, res) => {
  console.log(req.body)
  try{
    const filterCar = await Car.find({model: {$lt: "2017"}})
    res.json(filterCar)
  }catch (err) {
    console.json({ message: err.message })
  }
})

//Delete car from database
router.delete("/:id", getCarById, async (req, res) => {
  try {
    await res.car.remove();
    res.json({ message: "Car has been deleted from database" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Function to find car by id middleware

async function getCarById(req, res, next) {
  let car;
  try {
    //Take car id and look for it in the database
    car = await Car.findById(req.params.id);
    //If the id is not in the database, send 404 response
    if (car == null) {
      return res.status(404).json({ message: "Car not found in database" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //If car is in the database, get data and assign it to car variable and send as response
  res.car = car;
  //Continue with the rest of the operation
  next();
}

module.exports = router;
