fetch('http://localhost:8000/availcities')
    .then(res => {
        if (!res.ok) {
            console.log('Having issues loading data');
            return;
        }
        return res.json();
    })
    .then(data => {
        console.log("Fetched data:", data);
        if (data) {
            const originCity = document.getElementById('origin-city');
            const destinationCity = document.getElementById('destination-city');

            originCity.innerHTML = '<option value="">Select City</option>';
            destinationCity.innerHTML = '<option value="">Select City</option>';

            data.avail_cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;

                originCity.appendChild(option);
                destinationCity.appendChild(option.cloneNode(true));
            });
        } else {
            console.log("Cities array not found or data is invalid.");
        }
    })
    .catch(error => {
        console.error('Error fetching the cities:', error);
    });

function handleAddOrgin() {
    const Order_Datas = {
      orgin_name: document.getElementById('origin-name').value,
      orgin_address: document.getElementById('origin-address').value,
      orgin_city: document.getElementById('origin-city').value,
      orgin_zip: document.getElementById('origin-zip').value,
  
      Desti_name: document.getElementById('destination-name').value,
      Desti_address: document.getElementById('destination-address').value,
      Desti_city: document.getElementById('destination-city').value,
      Desti_zip: document.getElementById('destination-zip').value,
  
      pick_date: document.getElementById('pickup-date').value,
      pick_from_time: document.getElementById('pickup-time-from').value,
      pick_to_time: document.getElementById('pickup-time-to').value,

      description: document.getElementById('description').value,
      pallet: document.getElementById('pallet').value,
      quantity: document.getElementById('quantity').value,
      weight: document.getElementById('weight').value,
      dimension1: document.getElementById('dimension1').value,
      dimension2: document.getElementById('dimension2').value,
      dimension3: document.getElementById('dimension3').value,
      nmfc: document.getElementById('nmfc').value,
      flag: document.getElementById('flag').value
    };
  
    console.log(Order_Datas);
    
    const allFieldsFilled = Object.values(Order_Datas).every(value => value.trim() !== '');
    if (allFieldsFilled) {
      fetch('http://localhost:8000/addDetails', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ Order_Datas })
      })
      .then(res => {
        if (!res.ok) {
          console.log("Error in fetching data from the HTML file");
        }
      });
    } else {
      console.log("Some details fields need to fill");
    }  
  }
  