const express = require("express");
const router = new express.Router();
const trainData = require("../modal/user");
const {coachSeatsFunction}=require("../util")


router.get("/", (req, res) => {
  res.send("this is node");
});

router.get("/setTrainSeats", async (req, res) => {
  try {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L'];
    const seatsPerRow = [7, 7, 7, 7, 7, 7, 7,7,7,7,7,3];
    const coachSeats = {};
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const seats = seatsPerRow[i];
      for (let j = 1; j <= seats; j++) {
        const seat = `${row}${j}`;
        coachSeats[seat] = null;
      }
    }
    const resSeats = new trainData({ train: coachSeats });
    await resSeats.save();
    res.status(201).send({ message: "table created successfully" })
  } catch (e) {
    res.status(400).send({ message: "something went wrong", err: e })
  }
})


// tableSeatFind[0].train["A1"]
router.get("/getTrainAllSeats", async (req, res) => {
  try {
    const tableAllSeats = await trainData.find();
    if(tableAllSeats){
      res.status(201).send({ message: "table created successfully", tableData: tableAllSeats,status:1 })
    }else{
      res.status(201).send({ message: "table not found!", tableData: tableAllSeats,status:0 })
    }
  } catch (e) {
    res.status(400).send({ message: "something went wrong", err: e,status:0 })
  }
})

router.get("/resettable", async (req, res) => {
  try {
    const deleteTable = await trainData.findByIdAndDelete({_id:req.query.id});
    if(deleteTable){
      res.status(201).send({ message: "table created successfully" ,status:1 })
    }else{
      res.status(201).send({ message: "table not found!",status:0 })
    }
  } catch (e) {
    res.status(400).send({ message: "something went wrong", err: e,status:0 })
  }
})



router.post("/bookSeats", async (req, res) => {
  try {
   const response= coachSeatsFunction(req.body.numSeats);
   if(response){
res.status(200).send({"message":"booked seats",status:1})
   }else{
res.status(400).send({"message":"not booked yet",status:0})
   }


  } catch (e) {
    res.status(401).json({ message: "something went wrong", status: 0 });
    console.log(`parse error ${e}`);
  }
});



module.exports = router