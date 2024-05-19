import React,{useState} from 'react';
import './AppFoodData.css';
import Navbar from './Navbar/Navbar';
import {db, storage} from '../Firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";


const AppFoodData = () => {

   const[foodName, setFoodName] = useState('');
   const [foodDescription, setFoodDescription] = useState('');
   const [foodCategory, setFoodCategory] = useState('');
   const [foodPrice, setFoodPrice] = useState('');
   const [foodImage, setFoodImage] = useState(null);
   const [restaurantName, setRestaurantName] = useState('');
   // const [restaurantAddress, setRestaurantAddress] = useState('');
   const [restaurantPhone, setRestaurantPhone] = useState('');
   const [foodImageUrl, setFoodImageUrl] = useState('');
   const [foodType, setFoodType] = useState('');
   const [mealType, setMealType] = useState('');
   const [foodAddon, setFoodAddon] = useState('');
   const [foodAddonPrice, setFoodAddonPrice] = useState('');
   const [restaurantEmail, setRestaurantEmail] = useState('');
   const [restaurantAddressBuilding, setRestaurantAddressBuilding] = useState('');
   const [restaurantAddressStreet, setRestaurantAddressStreet] = useState('');
   const[ restaurantAddressCity , setRestaurantAddressCity ] = useState('');
   const [restaurantAddresssPincode, setRestaurantAddressPincode] = useState('');


   const handleSubmit = (e) => {
       e.preventDefault();

       if(foodImage == null) {
         alert("please select an image");
         return;
       }
       else{
         const imageRef = ref(storage,`FoodImages/${foodImage.name}`);
         uploadBytes(imageRef, foodImage)
         .then(() => {
            alert("Image uploaded successfull")
            getDownloadURL(imageRef)
            .then((url) => {
                // console.log(url)
                setFoodImageUrl(url)

                   const foodData = {
                    foodName,
                    foodPrice,
                    foodCategory,
                    foodDescription,
                    foodImageUrl : url,
                    restaurantName,
                  //   restaurantAddress,
                    restaurantPhone,
                    foodType,
                    mealType,
                    foodAddon,
                    foodAddonPrice,
                    restaurantEmail,
                    // restaurantAddressBuilding,
                    restaurantAddressStreet,
                    restaurantAddressCity,
                    restaurantAddresssPincode,
                    id: new Date().getTime().toString(),

                }

                try{
                    const docRef = addDoc(collection(db, "FoodData"), foodData);
                    alert("Data added successfully", docRef.id);
                }
                catch(error){
                    alert("Error adding document", error);
                }
            })
         })
         .catch((error) => {
            alert(error.message)
         })
       }

       
    

       
   }

    return(
       <div>
        <Navbar/>
       <div className="form-outer">
       <h1>Add Food Data</h1>
       <form className='form-inner'>
          <label>Food Name</label>
          <input type="text" name="food_name"
            onChange={(e) => setFoodName(e.target.value)}
          />
          <br/>
          <label>Food Description</label>
          <input type="text" name="food_description" 
             onChange={(e) => setFoodDescription(e.target.value)}
          />
          <br/>

          <div className="form-row">
            <div className="form-col">
              <label>Food Category</label>
              <select name="food_category" onChange={(e) => setFoodCategory(e.target.value)}>
                <option value="null">Select Food Category</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="italian"> Italian</option>
                <option value="mexicon">Mexicon</option>
                <option value="american">American</option>
              </select>
            
            </div>
            <div className="form-col">
               <label>Meal Type</label>
               <select name="meal_type" onChange={(e) => setMealType(e.target.value)}>
                 <option value="null">Select Meal Type</option>
                 <option value="dinner">Dinner</option>
                 <option value="starters">Starters</option>
                 <option value="breakfast">Breakfast</option>
                 <option value="liquid">Liquid</option>
               </select>
            
            </div>
          </div>
          <br/>
          
         <div className='form-row'>
             <div className='form-col'>
               <label>Food Price</label>
               <input type="number" name="food_price"
               onChange={(e) => setFoodPrice(e.target.value)}
               />
             </div>
             <div className='form-col'>
                 <label>Food type </label>
                 <select name="food_type" onChange={(e) => setFoodType(e.target.value)}>
                    <option value="null">Select Food Type</option>
                    <option value="veg"> veg</option>
                    <option value="non-veg">Non-Veg</option>
                    </select>
             </div>
         </div>
          <br/>

          <div className="form-row">
               <div className="from-col">
                  <label>Add On Name</label>
                  <input  type="text" name="food_addon" 
                  onChange={(e) => setFoodAddon(e.target.value)}/>
               </div>
               <div>
                  <label>Add On Price</label>
                  <input type="text" name="food_addon_price" 
                  onChange={(e) => setFoodAddonPrice(e.target.value)}/>
               </div>
          </div>
          <br/>
          <label>Food Image</label>
          <input type="file" name="food_image" 
             onChange={(e) => setFoodImage(e.target.files[0])}
          />
          <br/>
          <div className="form-row"> 
            <div className="form-col">
            <label>Restaurant Name</label>
              <input type="text" name="restaurant_name"
              onChange={(e) => setRestaurantName(e.target.value)}/> 
            </div>
            <div className="form-col">
              <label>Restaurant Street / Area Name</label>
              <input type="text" name="restaurant_address_street" 
              onChange={(e) => setRestaurantAddressStreet(e.target.value)}/>
            </div> 
          
          </div>
          <br/>

          <div className="form-row"> 
          <div className="form-col">
          <label>Restaurant city</label>
            <input type="text" name="restaurant_address_city"
            onChange={(e) => setRestaurantAddressCity(e.target.value)}/> 
          </div>
          <div className="form-col">
            <label>City Pin-code</label>
            <input type="number" name="restaurant_address_pincode" 
            onChange={(e) => setRestaurantAddressPincode(e.target.value)}/>
          </div> 
        
        </div>
        <br/>

        <div className="form-row"> 
        <div className="form-col">
        <label>Restaurant Phone</label>
          <input type="number" name="restaurant_phone"
          onChange={(e) => setRestaurantPhone(e.target.value)}/> 
        </div>
        <div className="form-col">
          <label>Restaurant Email</label>
          <input type="email" name="restaurant_email" 
          onChange={(e) => setRestaurantEmail(e.target.value)}/>
        </div> 
      
      </div>
      <br/>

          <button onClick={handleSubmit}>Add Food</button>

       </form>
     </div>
       </div>
    )
};

export default AppFoodData;