import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignInSide";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import AdminHeader from "pages/AdminHeader";
import Dashboard from "pages/Dashboard";
import ManageUsers from "pages/ManageUsers";
import WebHeader from "pages/Headers";
import MyAddSparePart from "pages/MyAddSparePart";
import SparePart from "pages/SparePart";
import EditSparePart from "pages/EditSparePart";
import BookAppointment from "pages/BookAppointment";
import SparePartDetails from "pages/SparePartDetails";
import FavoCar from "pages/FavoCar";

const AppRoutes = () => {
    return(
        <>
        <Routes>
            <Route path="*" element={<h2>404 Page Not Found</h2>} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/reset-password" element={<ResetPassword/>} />
            <Route element={<WebHeader />} >
            <Route path="/" element = {<Home/>} />
            <Route path="/add-part" element={<MyAddSparePart />} /> 
            <Route path="/getAll" element={<SparePart />} /> 
            <Route path="/favorite" element={<FavoCar  />} /> 


            <Route path="/spare-part/:id" element={<SparePartDetails />} /> 
            <Route path="/book-service" element={<BookAppointment />} /> 
            <Route path="/edit-spare-part/:id" element={<EditSparePart />} />

            </Route>
            <Route path="/admin/*" element={<AdminHeader />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<ManageUsers />} />
            </Route>
        </Routes>
        </>
    )
}

export default AppRoutes;