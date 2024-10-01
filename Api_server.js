const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/addDetails", (req, res) => {
  const new_Item = req.body.Order_Datas; 
  try {
    let data = JSON.parse(fs.readFileSync("public/Datas.json"));
    
    const formattedItem = {
      Name: new_Item.orgin_name, 
      origin: {
        name: new_Item.orgin_name,
        address: new_Item.orgin_address,
        city: new_Item.orgin_city,
        zip: new_Item.orgin_zip,
      },
      Desti: {
        name: new_Item.Desti_name,
        address: new_Item.Desti_address,
        city: new_Item.Desti_city,
        zip: new_Item.Desti_zip,
      },
      Date_Time: {
        date: new_Item.pick_date,
        From_time: new_Item.pick_from_time,
        To_time: new_Item.pick_to_time,
      },
      Line_Items:{
        description: new_Item.description,
        pallet: new_Item.pallet,
        quantity: new_Item.quantity,
        weight: new_Item.weight,
        dimension1: new_Item.dimension1,
        dimension2: new_Item.dimension2,
        dimension3: new_Item.dimension3,
        nmfc: new_Item.nmfc,
        flag: new_Item.flag
      }
    };

    data.order_datas.push(formattedItem);
    fs.writeFileSync("public/Datas.json", JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    console.error("Error updating origin details:", error);
    res.status(500).json({ message: "Error updating the data" });
  }
});

app.get("/availcities", (req, res) => {
  fs.readFile("public/AvailCity.json", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read cities data" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
