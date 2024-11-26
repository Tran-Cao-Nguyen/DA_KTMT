import express from "express";
import User from "../models/user.js";
import protect from "../middleware/middleware.js";

const router = express.Router();


//post api

router.post(`/`, async (req, res) => {
    console.log("Result", req.body);
  
    let data = User(req.body);
    try {
      let dataToStore = await data.save();
      res.status(200).json(dataToStore);
    } catch (error) {
      res.status(400).json({
        status: error.message,
      });
    }
  });
  
  // get api
  router.get(`/profile`, protect, async (req, res) => {
    try {
      const user = await User.findOne({id: req.user.id});
      if(!user) {
        return res.status(404).json({message: "user not found"});
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  });

  export default router;