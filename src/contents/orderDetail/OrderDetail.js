'use client'
import { getUser, logoutUser, updateUser } from '@/redux/slices/auth'
import {  Avatar, Box, Button, Divider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter,useParams } from 'next/navigation'
import dayjs from 'dayjs'
import { getOrder, getSingleOrder } from '@/redux/slices/order'


const OrderDetail = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const {singleOrder,orders} = useSelector((state) => state.order); 
    const [orderDetail, setOrderDetail] = useState({})
    const {cart} = useSelector((state)=> state.cart)
    const params = useParams()
    console.log(params)
   
console.log(singleOrder,'singleorder')
     const handleLogout = async () => {
        localStorage.removeItem('accessToken');
        await dispatch(logoutUser())
        router.push('/login')
           }
     
    const fetchUser = async() =>{
        let result = await dispatch(getUser())
        if(result)
      return true
    }

    // const fetchOrder = async() =>{
    //     let arr;
    //     for(let order of orders){
    //       console.log("order",order)
    //     for(let k of order.products){
    //         if(k.id && k.id ===router.query.id)
    //          arr = {...k}
    //     }
    // }
    // setOrderDetail({...arr})

    // }

    const fetchOrder = async()=>{
      let result = await dispatch(getSingleOrder(params?.orderId))
      if(result){
        return true
      }
     
    }
    

    useEffect(()=>{
          fetchUser()
          fetchOrder()
    },[dispatch])

  
    const steps = [
      {
        status:"order confirm",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.orderConfirm && orderDetail.orderStatus.orderConfirm.date&& orderDetail.orderStatus.orderConfirm.date
      },
      {
        status:"Shipped",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.shipped && orderDetail.orderStatus.shipped.date  && orderDetail.orderStatus.shipped.date
      },
      {
        status:"Out for Deleivery",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.outForDelivery&& orderDetail.orderStatus.outForDelivery.date && orderDetail.orderStatus.outForDelivery.date
      },
      {
        status:"Delievered",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.delivered&& orderDetail.orderStatus.delivered.date && orderDetail.orderStatus.delivered.date
      }
      ];  
        
      let activeSteps = ()=>{
        if(orderDetail.orderStatus){
       if(orderDetail.orderStatus.delivered && orderDetail.orderStatus.delivered.isConfirmed)
         return 4;
         else if(orderDetail.orderStatus.outForDelivery && orderDetail.orderStatus.outForDelivery.isConfirmed)
         return 3;
         else if(orderDetail.orderStatus.shipped && orderDetail.orderStatus.shipped.isConfirmed)
         return 2;
         else if(orderDetail.orderStatus.orderConfirm && orderDetail.orderStatus.orderConfirm.isConfirmed)
         return 1;
         else
         return 0;
        }
    }


    let mrp = 0;
    let cost = 0;

   for(let order of orders){
      for(let product of order.products){
       mrp += (product.productId && product.productId.price && product.productId.price.mrp)
       cost += (product.productId && product.productId.price && product.productId.price.cost)
  }
  
}

let discount = ((mrp) - (cost))
let total = ((cost))
  
  return (
    <div className='bg-white'>
      
     <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'80%',display:'flex',justifyContent:'center',marginTop:'40px',gap:'40px'}}>


        <Box  sx={{flexDirection:'column',width:'300px',background:'white',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'2px',height:'420px'}}>

<Box sx={{padding:'20px',display:'flex',gap:'30px'}} className='bg-slate-300'>
 <Typography sx={{color:'black'}}><Avatar/></Typography>
 <Box >
   <Typography sx={{color:'black'}}>{user.name}</Typography>
   <Typography sx={{color:'black',fontSize:'13px'}}>{user.email}</Typography>
    
 </Box>
</Box>
<Divider/>
<Typography sx={{fontWeight:'400',fontSize:'16px',padding:'15px',cursor:'pointer'}}>Profile</Typography>
<Divider/>

<Typography onClick={() => router.push('/orders')} sx={{fontWeight:'400',fontSize:'16px',padding:'15px',cursor:'pointer'}}>Orders</Typography>
<Divider/>

<Typography sx={{fontWeight:'400',fontSize:'16px',padding:'15px'}}>Wishlist</Typography>
<Divider/>

<Typography sx={{fontWeight:'400',fontSize:'16px',padding:'15px'}}>Saved Address</Typography>
<Divider/>

<Typography sx={{fontWeight:'400',fontSize:'16px',padding:'15px'}}>Contact Us</Typography>
<Divider/>

<Typography onClick={handleLogout} sx={{fontWeight:'400',fontSize:'16px',padding:'15px',cursor:'pointer'}}>Logout</Typography>

</Box>








<Box sx={{width:'70%',height:'auto'}}>

    <Box sx={{display:'flex',border:'1px solid rgba(0,0,0,0.1)',padding:'20px',marginBottom:'20px'}} className='bg-slate-300'>
        <Typography>ORDERS DETAILS</Typography>
    </Box>


<Box  sx={{display:'flex',flexDirection:'column',border:'1px solid rgba(0,0,0,0.1)',padding:'15px',height:'300px'}}>
                    

                    <Box sx={{display:'flex',gap:'20px',marginTop:'10px',}}>
                        <Box sx={{display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
                           <img src= 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/131_f04f74fd-45d4-4614-85cf-6ccf69c4cf90.jpg?v=1691395049'
                          //  {orderDetail && orderDetail.productId && orderDetail.productId.image && orderDetail.productId.image}    
                           style={{width:'130px',height:'170px'}}/>
                           <Box sx={{display:'flex',justifyContent:'center'}}>
                           <Button variant='outlined' sx={{width:'200px',height:'30px'}}>Cancel Order</Button>
                           </Box>
                        </Box>
 
                        <Box>
                            <Typography sx={{fontSize:'18px',fontWeight:'600'}}> Wireless Earbud{orderDetail && orderDetail.productId && orderDetail.productId.title.shortTitle}</Typography>
                            <Typography sx={{fontSize:'18px',fontWeight:'600'}}> Airdopes 131{orderDetail && orderDetail.productId && orderDetail.productId.title.longTitle}</Typography>
                            <Typography sx={{fontSize:'16px',fontWeight:'600'}}>₹1999{orderDetail && orderDetail.productId && orderDetail.productId.price.cost}</Typography>
                        </Box>
                    </Box>
                   
               </Box>

           <Box sx={{padding:'20px'}}>
               <Typography>Shipping Details</Typography>
               <Box sx={{display:'flex',gap:'10px'}}>
                <Typography sx={{fontWeight:'600'}}>{user.name}</Typography>
                <Typography sx={{fontWeight:'600'}}>{user.lastName}</Typography>
               </Box>
               <Typography>Locality- Raja Garden {orders[0] && orders[0].address && orders[0].address.locality}</Typography>
                <Typography>City- Haridwar{orders[0] && orders[0].address && orders[0].address.city}</Typography>
               <Typography>Pincode- 249404{orders[0] && orders[0].address && orders[0].address.state} {orders[0] && orders[0].address && orders[0].address.zipcode}</Typography>
                            
               <Typography>Ph. No.- 9129842706 {user.phone}</Typography>
            </Box> 


          <Box sx={{display:'flex',gap:'100px'}}>


            <Box sx={{width:'50%',padding:'20px',height:'300px'}} className="bg-slate-100">
            <Box sx={{marginBottom:'10px'}}>
                  <Typography sx={{fontWeight:'600'}}>PRICE DETAILS</Typography>
                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total No. of Items</Typography>
                    <Typography sx={{fontSize:'14px'}}>1</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total MRP Value</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{mrp}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Discount on MRP</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{discount}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>GST</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹gst</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total Value</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{total}</Typography>
                  </Box>
                </Box>
            </Box>


            <Box sx={{ width: '30%',height:'400px' }}>
                <Typography sx={{padding:'15px'}}>Order Status</Typography>
      <Stepper activeStep={activeSteps()}  orientation='vertical'>
        {steps.map((label,index) => (
          <Step key={index}>
            <StepLabel>{label.status}</StepLabel>
            <Typography sx={{fontSize:'12px'}}>{label.date && dayjs(label.date).format("DD-MM-YYYY")}</Typography>
          </Step>
        ))}
      </Stepper>
       </Box>

      </Box>
     </Box>


  </Box>
 </Box>

  
    </div>
  )
}

export default OrderDetail
