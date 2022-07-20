const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/signup", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
      let userData = req.body;
      if (!userData.name) {
          return res.send("Invalid Name")
      }
      if (!userData.email) {
          return res.send("Invalid email")
      }
      if (!userData.password) {
          return res.send("Invalid password")
      }
    console.log(userData);
      
   let exists = data.filter((e) => e.email == userData.email);
    console.log("exists", exists);
    if (exists.length !== 0) {
      return res.send("User Already Exists");
    } else {
      console.log(userData);
      userData["id"] = Date.now();
       data.push(userData);
      let signupData = JSON.stringify(data);
      fs.writeFileSync("./userData.json", signupData);
      return res.status(201).send(data);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/login", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    let userData = req.body;
    if (!userData.email) {
      return res.send("Invalid email")
    }
    if (!userData.password) {
      return res.send("Invalid password")
    }
      
    let exists = data.filter((e) => e.email == userData.email);
    console.log("exists", exists);
    if (exists.length !== 0) {
      if (exists[0].email == userData.email && exists[0].password == userData.password) {
        return res.send("login suscessfull");
      }
      else {
        console.log(exists[0].email, userData.email);
        console.log(exists[0].password, userData.password);
        return res.send("invalid credential");
      }
    } else {
     
      return res.status(200).send("User not found");
    }
  }
  catch (err) {
    return res.send(err.message)
  }
});

router.delete("/:id", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    console.log(data);
    let exists = data.filter((e) => e.id == req.params.id);
    console.log("exists", exists);
    if (exists.length !== 0) {
      let newData = data.filter((e) => e.id != req.params.id)
      newData = JSON.stringify(newData);
      fs.writeFileSync("./userData.json", newData);
      return res.status(200).send(newData);
    } else {
      return res.send("User not found");
    }
  } catch (error) {
    return res.send(err.message)
  }
})


router.patch("/:id", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    console.log(data);
    let exists = data.filter((e) => e.id == req.params.id);
    let ind = 0
    if (exists.length !== 0) {
      for (let i = 0; i < data.length; i++){
        if (data[i].id == req.params.id) {
          ind = i
          break;
        }
      }
      data[i].name = req.body.name || data[i].name; 
      data[i].email = req.body.email || data[i].email; 
      data[i].password = req.body.password || data[i].password; 
      data = JSON.stringify(data);
      fs.writeFileSync("./userData.json", data);
      return res.status(200).send(data);
    } else {
      return res.send("User not found");
    }
  } catch (error) {
    return res.send(err.message)
  }
})



module.exports = router;