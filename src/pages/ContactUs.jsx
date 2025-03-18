// /* eslint-disable no-unused-vars */
// import { Input, Textarea, Card, Button } from "@material-tailwind/react";
// import { useEffect, useState } from "react";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSend = () => {
//     // console.log(formData);
//   };

//   useEffect(()=>{
//     window.scrollTo(0,0);
//   },[])

//   return (
//     <div className="bg-light-blue-50">
//       <div className="flex justify-center items-center bg-light-blue-200 h-auto">
//         <div>
//           <p className="text-4xl md:text-6xl lg:text-6xl m-6 lg:m-32 text-[#1E2761]">
//             Contact Us
//           </p>
//         </div>
//       </div>
//       <div className=" container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* <div>
//           <h2 className="text-xl font-semibold mb-3">Feedback</h2>
//           <p>
//             We value your feedback. Share your thoughts, suggestions, or
//             concerns with us by filling out the form below:
//           </p>
//           <form className=" rounded px-8 pt-6 pb-8 mb-4">
//             <Card
//               color="transparent"
//               shadow={false}
//               className="bg-light-blue-50"
//             >
//               <div className="mb-4">
//                 <div className="w-full md:w-[18rem] lg:w-[35rem]">
//                   <Input
//                     size="lg"
//                     label="Your Name"
//                     placeholder="Enter your name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <div className="w-full md:w-[18rem] lg:w-[35rem]">
//                   <Input
//                     size="lg"
//                     label="Your Email ID"
//                     placeholder="Enter your Email ID"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <div className="flex mt-2">
//                   <Textarea
//                     size="lg"
//                     label="Message"
//                     placeholder="Message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <Button color="green" onClick={handleSend}>
//                   Send
//                 </Button>
//               </div>
//             </Card>
//           </form>
//         </div> */}

//         <div className="mx-4 md:mx-0">
//           {/* <h1 className="text-3xl font-bold mb-5">Contact Us</h1> */}
//           <p className="text-lg mb-5">
//             Have questions? We are here to help. Get in touch with us using the
//             contact information provided below:
//           </p>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-3">Customer Support</h2>
//             <p>
//               Name: <span>Asif Attar</span>
//             </p>
//             <p>
//               Email:{" "}
//               <a href="mailto:support@Cartechindia.com">
//                 asif.attar@caryanam.in
//               </a>
//             </p>
//             <p>Phone: 7755994123</p>
//             {/* <p>Working Hours: Monday to Friday, 9:00 AM - 5:00 PM (IST)</p> */}
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-3">Technical Support</h2>
//             <p>
//               Name: <span>Asif Attar</span>
//             </p>
//             <p>
//               Email:{" "}
//               <a href="mailto:techsupport@Cartechindia.com">
//                 asif.attar@caryanam.in
//               </a>
//             </p>
//             <p>Phone: 7755994123</p>
//             {/* <p>Working Hours: Monday to Friday, 8:00 AM - 7:00 PM (IST)</p> */}
//           </div>

//           {/* <div className="mb-8">
//                     <h2 className="text-xl font-semibold mb-3">Visit Us</h2>
//                     <p>Cartechindia Headquarters</p>
//                     <p>123 Car Avenue</p>
//                     <p>Pune, Maharashtra, 441122</p>
//                     <p>India</p>
//                 </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
