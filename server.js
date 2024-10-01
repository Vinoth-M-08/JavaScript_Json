const express=require('express');
const bodyParser=require('body-parser')
const fs=require('fs');

const app=express();
const PORT=8000;

app.use(bodyParser.json());
app.use(express.static('public')); 

let citiesData = JSON.parse(fs.readFileSync('public/Cities.json'));
// if (!citiesData.orgin_names) {
//     citiesData.orgin_names = [];
// }

app.post('/addOrginName',(req,res)=>{
    const company_name=req.body.company_name;
    console.log("console_city",company_name);
    if(company_name){
        citiesData.orgin_names.push(company_name);
        try {
            fs.writeFileSync('public/Cities.json', JSON.stringify(citiesData, null, 2),);
            console.log('File updated successfully');
            return res.json({ message: 'Company name added successfully' });
        } catch (error) {
            console.error('Error writing to file:', error);
            return res.status(500).json({ message: 'Error writing to file' });
        }
    }
    return res.status(400).json({message:company_name})
    
})



let destinames=JSON.parse(fs.readFileSync('public/destinName_add.json'));


app.post('/addDestinationName',(req,res)=>{
    const desti_name=req.body.desti_name;
    console.log("Desti_City",desti_name);
    if(desti_name){
        destinames.destination_name.push(desti_name);
        try{
            fs.writeFileSync('public/destinName_add.json',JSON.stringify(destinames,null,2));
            console.log('File Updated SuccessFully');
            return res.json({message:'Desti name added successfully'})

        }catch(error){
            console.log('Error Writing in file',error);
            return res.status(500).json({message:'Error writing in yhe file'});
        }
    }
    return res.status(400).json({message:desti_name})
})


let OrgAddress=JSON.parse(fs.readFileSync('public/orgin_add.json'));

app.post('/addOrginAdress',(req,res)=>{
    const Datas=req.body.org_add;
    console.log("Datas",Datas);
    if(Datas){
        OrgAddress.order_datas.push(Datas);
        try{
            fs.writeFileSync('public/orgin_add.json',JSON.stringify(OrgAddress,null,2));
            console.log('File Updated SuccessFully');
            return res.json({message:'Orgin Address added successfully'})

        }catch(error){
            console.log('Error Writing in file',error);
            return res.status(500).json({message:'Error writing in the file'});
        }
    }
    return res.status(400).json({message:Datas})
})

let orgin_zip=JSON.parse(fs.readFileSync('public/Zip.json'))


app.post('/addOrginZipCode',(req,res)=>{
    const org_zip=req.body.org_zip;
    console.log("Orgin Zip Code",org_zip);
    if(org_zip){
        try{
            orgin_zip.orgin_Zip.push(org_zip);
            fs.writeFileSync('public/Zip.json',JSON.stringify(orgin_zip,null,2));
            console.log('File Updated Successfully');
            return res.json({message:'Orgin ZipCode added successfully'})

        }catch(error){
            console.log('Error in creating zipCode for orgin',error);
            return res.status(500).json({message:'Error writing in the file'});
        }
    }
})

let destin_zip = JSON.parse(fs.readFileSync('public/Zip.json'));

app.post('/addDestiZip', (req, res) => {
    const dest_zip = req.body.dest_zip;
    
    console.log("Destination Zip Code", dest_zip); 
    if (dest_zip) {
        try {
            destin_zip.DestinationZip.push(dest_zip);
            fs.writeFileSync('public/Zip.json', JSON.stringify(destin_zip, null, 2));
            console.log('File Updated Successfully');
            return res.json({ message: 'Destination ZipCode added successfully' });
        } catch (error) {
            console.log("Error in fetching data", error);
            return res.status(500).json({ message: 'Error in writing the file' });
        }
    } else {
        return res.status(400).json({ message: 'Destination ZipCode is required' });
    }
});


app.get('/availcities', (req, res) => {
    fs.readFile('public/AvailCity.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read cities data' });
        }
        res.json(JSON.parse(data));
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});