import React,{useEffect, useState} from 'react';
import './ShowOrderSpecific.css';
import Navbar from '../Navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../Firebase/FirebaseConfig';

const ShowOrderSpecific = () => {

     const {orderid} = useParams();

     const[orderdata, setOrderData] = useState([]);

     const getorderdata = async () => {
        const docRef = doc(db,"UserOrders", orderid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            console.log("Document data ", docSnap.data());
            setOrderData(docSnap.data());
        } else {
            console.log("No such document");
        }
     }

     useEffect(() => {
        getorderdata();
     },[])

    return(
        <div className="order-section">
          <Navbar/>
           <Link to="/orders"><button className="goback-btn">Go Back</button></Link>
           <h1 className='order-head1'>Order Details</h1>

            <div className="orderdetails-form">
              <div className="orderdetails_row">
                <p >Customer Name</p>
                <p >{orderdata.ordername}</p>
              </div>
              <div className="orderdetails_row">
                <p>Order Address</p>
                <p>{orderdata.orderaddress}</p>
              </div>
              <div className="orderdetails_row">
               <p>Customer Phone</p>
               <p>{orderdata.orderphone}</p>
              </div>
              <div className="orderdetails_row">
               <p>Order Status</p>
               <p>{orderdata.orderstatus}</p>
              </div>
            </div>

         
        </div>
    )
}

export default ShowOrderSpecific;