/* eslint-disable no-unused-vars */
import { Routes, Route, Router } from "react-router-dom";
import { FavoriteProvider } from "./ui/FavoriteContext";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import { LoginCard } from "./pages/LoginCard";
import { SimpleRegistrationForm } from "./pages/SimpleRegistrationForm";

import BuyCar from "./pages/BuyCar";
import CarDetailsById from "./pages/CarDetailsById";

import Admin from "./pages/adminpages/Admin";
import AdminMiddleware from "./middleware/AdminMiddleware";
import {
  onlyAdmin,
  onlyDealer,
  onlyInspector,
  onlySeller,
} from "./components/config/Roles";
import AdminDealerInfo from "./pages/adminpages/AdminDealerInfo";
import AdminDealerEdit from "./pages/adminpages/AdminDealerEdit";
import DealerDashboard from "./pages/dealer/DealerDashboard";
import DealerMiddleware from "./middleware/DealerMiddleware";
import BiddingMainPage from "./pages/bidding/BiddingMainPage";
import AddDealerCar2 from "./pages/dealer/AddDealerCar2";
import EditDealerCar from "./pages/dealer/EditDealerCar";
import BiddingAddCar from "./pages/bidding/BiddingAddCar";
import BiddingEditCar from "./pages/bidding/BiddingEditCar";
import SetTimer from "./pages/bidding/SetTimer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./components/home/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import AppLayout2 from "./ui/AppLayout2";
import PendingRequest from "./pages/PendingRequest";
import OrderDealer from "./pages/dealer/OrderDealer";
import UserConfirmBooking from "./pages/UserConfirmBooking";
import DealerAllPendingRequest from "./pages/dealer/DealerAllPendingRequest";
import BiddingCarDetailsById from "./pages/bidding/BiddingCarDetailsById";
import DealerPendingRequest from "./pages/dealer/DealerPendingRequest";
import BiddingDealerPendingReq from "./pages/bidding/BiddingDealerPendingReq";
import Uploadimages2 from "./ui/UploadImages2";
import InspectorList from "./pages/adminpages/InspectorList";
import CarInspectionTable from "./pages/CarInspectionTable";
import CarVerify from "./pages/Inspector/CarVerify";
import AdminInspectorEdit from "./pages/adminpages/AdminInspectorEdit";
import ChangePassword from "./pages/dealer/ChangePassword";
import DealerEdit from "./pages/dealer/DealerEdit";
import TransactionByAccount from "./pages/transaction/TransactionByAccount";
import Wallet from "./pages/transaction/Wallet";
import TransactionController from "./pages/transaction/TransactionController";
import EditImage from "./pages/dealer/EditImage";
import InspectorMiddleware from "./middleware/InspectorMiddleware";
import { object } from "prop-types";
import PendingRequest2 from "./pages/dealer/PendingRequest2";
import SalesList from "./pages/adminpages/SalesList";
// import AdminInspectorInfo from "./pages/adminpages/AdminInspectorInfo";
import CarListing from "./pages/sales/CarListing";

import CarListModels from "./pages/adminpages/CarListModels";
import SellForCar from "./pages/dealer/SellForCar";

import BiddingDealerCars from "./pages/biddingDashboard/BiddingDealerCars";
import CarListTable from "./pages/biddingDashboard/CarListTable";
import BiddingDealer from "./pages/dealer/BiddingDealer";
import BiddingCars from "./pages/adminpages/BiddingCars";
import CarDocumentSection from "./pages/InspectionReportPage/CarDocumentSection";
import ExteriorSection from "./pages/InspectionReportPage/ExteriorSection";
import EngineSection from "./pages/InspectionReportPage/EngineSection";
import AcSection from "./pages/InspectionReportPage/AcSection";
import ElectricalSection from "./pages/InspectionReportPage/ElectricalSection";
import SteeringSection from "./pages/InspectionReportPage/SteeringSection";
import InteriorSection from "./pages/InspectionReportPage/InteriorSection";
import AdminInspectorInfo from "./pages/adminpages/AdminInspectorInfo";
import UploadImages3 from "./ui/UploadImages3";
import BiddingAddCar2 from "./pages/bidding/BiddingAddCar2";
import AdminSalesInfo from "./pages/adminpages/AdminSalesInfo";
import AdminSalesEdit from "./pages/adminpages/AdminSalesEdit";
import BiddingCarDetailsById1 from "./pages/bidding/BiddingCarDetailsById1";
import BiddingEditImage from "./pages/bidding/BiddingEditImage";
import SalePersonMiddleware from "./middleware/SalePersonMiddleware";
import ImageUploader from "./components/demo/uploadimage";
import FinalReport from "./pages/InspectionReportPage/FinalReport";
import LiveBid from "./pages/LiveBidding/LiveBid";
import BiddingCarDetail from "./pages/LiveBidding/BiddingCarDetail";
import BiddingCar from "./pages/bidding/BiddingCar";
import DealerContact from "./components/carDetails/DealerContact";
import WinnerSection from "./pages/dealer/WinnerSection";
import { FavoritePage } from "./ui/FavoritePage";
import { CardDefault } from "./ui/CardDefault";
import WebSocketConnection from "./Utiles/WebSocketConnection";
import UserProfileUpdate from "./pages/user/UserProfileUpdate";
import UserInfo from "./pages/user/UserInfo";
import SalesDealer from "./pages/sales/SalesDealer";
import UserChangePassword from "./pages/user/UserChangePassword";
import InspectorChangePassword from "./pages/Inspector/InspectorChangePassword";
import SalerChangePassword from "./pages/sales/SalerChangePassword";
import PremiumCars from "./components/home/PremiumCars";
import InspectorEdit from "./pages/Inspector/InspectorEdit";
import SalerEdit from "./pages/sales/SalerEdit";
//PremiumCars
import PremiumCarList from "./components/Premium/PremiumCarList";
import CarImageCarousel from "./components/Premium/CarImageCarousel";
import ForgetPassword from "./forms/ForgetPassword";
import ResetPassword from "./forms/ResetPassword";
import SellCarForm from "./pages/user/SellCarForm";
import EditSellForm from "./pages/user/EditSellForm";
import SellCarList from "./pages/user/SellCarList";
import SellForCarPremium from "./pages/dealer/SellForCarPremium";
import AddPremiumCarForm from "./pages/dealer/AddPremiumCarForm";
import EditPremiumCar from "./pages/dealer/EditPremiumCar";
import AdminCarList from "./pages/adminpages/AdminCarList";
import CarDetailsByIdPremium from "./pages/CarDetailsByIdPremium";
import CarList from "./pages/b2b/CarList";
import AdminUserReq from "./pages/adminpages/AdminUserReq";
import SalerUserSaleReqEdit from "./pages/sales/SalerUserSaleReqEdit";
import FinalReportUser from "./pages/user/FinalReportUser";
import UserInspectionCars from "./pages/Inspector/UserInspectionCars";
import UserSaleCarAdd from "./pages/user/UserSaleCarAdd";
export default function App() {
  return (
    <>
      <WebSocketConnection />
      <Routes>
        <Route path="/pendingrequest2" element={<PendingRequest2 />} />
        <Route path="/" element={<Home />} />

        <Route element={<AppLayout />}>
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="signin" element={<LoginCard />} />
          <Route path="/reset-Password" element={<ResetPassword />} />
          <Route path="signin" element={<LoginCard />} />
          <Route path="signup" element={<SimpleRegistrationForm />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/carlist" element={<BuyCar />} />
          <Route path="/premiumcarlist" element={<PremiumCarList />} />
          <Route path="/carimagecarousel" element={<CarImageCarousel />} />
          <Route path="/carlistadmin" element={<AdminCarList />} />

          <Route path="/wsConnction" element={<BiddingCar />} />
          <Route
            path="/carlist/cardetails/:carId"
            element={<CarDetailsById />}
          />
          <Route
            path="/carlist/cardetails/premium/:carId"
            element={<CarDetailsByIdPremium />}
          />
          <Route
            path="/biddinglist/cardetails/:beadingCarId/:timerId"
            element={<BiddingCarDetailsById1 />}
          />

          <Route
            path="/biddinglist/cardetails/:beadingCarId"
            element={<BiddingCarDetailsById1 />}
          />
          <Route
            path="/biddinglist/cardetail/:page/:beadingCarId"
            element={<BiddingCarDetailsById1 />}
          />
          <Route path="/pendinrequest/:userid" element={<PendingRequest />} />
          <Route path="/user/booking/:id" element={<UserConfirmBooking />} />
          <Route
            path="/user/UserProfileUpdate/:userProfileId"
            element={<UserProfileUpdate />}
          />
          <Route path="/user/ChangePassword" element={<UserChangePassword />} />
          <Route
            element={
              <AdminMiddleware allowedRoles={[...Object.values(onlyAdmin)]} />
            }
          >
                        <Route path="/Admin/UserRequest" element={<AdminUserReq />} />

            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/dealer/carlist/:id"
              element={<AdminCarList />}
            />
            <Route path="/admin/dealer/:id" element={<SellForCar />} />
            <Route path="/admin/premium/:id" element={<SellForCarPremium />} />

            <Route path="/inspector" element={<InspectorList />} />
            <Route path="/admin/salesuser" element={<SalesList />} />
            <Route path="/CarInspection" element={<CarInspectionTable />} />
            <Route
              path="/admin/inspector/info/:userId"
              element={<AdminInspectorInfo />}
            />
            <Route
              path="/admin/inspection/report/:beadingCarId"
              element={<FinalReport />}
            />

            <Route path="/carlistmodel" element={<CarListModels />} />

            <Route
              path="/admin/dealer/info/:id"
              element={<AdminDealerInfo />}
            />

            <Route path="/admin/sales/info/:id" element={<AdminDealerInfo />} />
            <Route
              path="/admin/dealer/edit/:userid/:id"
              element={<AdminDealerEdit />}
            />
            <Route
              path="/admin/seller/info/:userId"
              element={<AdminSalesInfo />}
            />
            <Route
              path="/admin/seller/edit/:userid/:salesPersonId"
              element={<AdminSalesEdit />}
            />
            <Route
              path="/admin/inspector/edit/:userid/:inspectorprofileid"
              element={<AdminInspectorEdit />}
            />
            <Route
              path="/transactionbyaccount"
              element={<TransactionByAccount />}
            />
            <Route path="/wallet" element={<Wallet />} />
            <Route
              path="/transactioncontroller"
              element={<TransactionController />}
            />
            <Route path="/carlisting" element={<CarListing />} />
            <Route path="/admin/biddingcar" element={<BiddingDealerCars />} />
            <Route path="/carlisttable" element={<CarListTable />} />

            <Route
              path="/admin/carverify/:beadingCarId"
              element={<CarVerify />}
            />
            <Route
              path="/admin/inspection/report/:beadingCarId"
              element={<FinalReport />}
            />
            <Route
              path="/admin/salesDealers/:salePersonId"
              element={<SalesDealer />}
            />
          </Route>

          <Route
            element={
              <DealerMiddleware allowedRoles={[...Object.values(onlyDealer)]} />
            }
          >
            <Route path="/dealer/:id" element={<SellForCar />} />
            <Route path="/dealer/premium/:id" element={<SellForCarPremium />} />
            <Route path="/dealer/b2b/:id" element={<CarList />} />
            <Route path="/dealer/:id/addcar" element={<AddDealerCar2 />} />
            <Route
              path="/dealer/premium/:id/addcar"
              element={<AddPremiumCarForm />}
            />

            <Route
              path="/dealer/:id/uploadimage/:carId"
              element={<Uploadimages2 />}
            />
            <Route path="/dealer/:id/edit" element={<DealerEdit />} />
            <Route
              path="/dealer/finalreport/:beadingCarId"
              element={<FinalReport />}
            />
            <Route path="/dealer/info/:id" element={<AdminDealerInfo />} />

            <Route
              path="/dealer/live/carDetails/:bidCarId/:beadingCarId"
              element={<BiddingCarDetailsById1 />}
            />
            <Route
              path="/dealer/:id/car/edit/:carId"
              element={<EditDealerCar />}
            />
            <Route
              path="/dealer/premium/:id/car/edit/:carId"
              element={<EditPremiumCar />}
            />
            <Route
              path="/dealer/:carId/:id/editimage"
              element={<EditImage />}
            />
            <Route
              path="/dealer/:id/booking/confirm"
              element={<OrderDealer />}
            />
            <Route
              path="/dealer/:id/allpending"
              element={<DealerAllPendingRequest />}
            />
            <Route path="/dealer/biddingcar" element={<BiddingDealerCars />} />
            <Route
              path="/car/:CarId/pendinguser"
              element={<DealerPendingRequest />}
            />
            <Route
              path="dealer/finalreport/:beadingCarId"
              element={<FinalReport />}
            />
            <Route path="/dealer/live/cars" element={<LiveBid />} />
            <Route path="/dealer/winnersection" element={<WinnerSection />} />
            <Route path="/biddingcardetail" element={<BiddingCarDetail />} />
          </Route>
          <Route
              path="/user/car/status/:userFormId"
              element={<FinalReportUser />}
            />
            <Route
              path="/user/"
              element={<FinalReportUser />}
            />
          <Route
            element={
              <InspectorMiddleware
                allowedRoles={[...Object.values(onlyInspector)]}
              />
            }
          >
            
            <Route
              path="/Inspector/ChangePassword"
              element={<InspectorChangePassword />}
            />
            <Route
              path="/inspector/info/:userId"
              element={<AdminInspectorInfo />}
            />

            <Route
              path="/inspector/carverify/:beadingCarId"
              element={<CarVerify />}
            />
            <Route
              path="/inspector/carverify/:beadingCarId"
              element={<CarVerify />}
            />
            <Route path="/inspector/car" element={<CarListing />} />
            <Route path="/inspector/user/cars" element={<UserInspectionCars />} />
            {/* <Route path="/inspector/carverify/:beadingCarId" element={<CarVerify />} /> */}
            {/* <Route path="/inspector/car" element={<CarListing />} /> */}
            <Route path="/inspector/car/add" element={<BiddingAddCar2 />} />
            <Route
              path="/inspector/edit/:userid/:inspectorprofileid"
              element={<InspectorEdit />}
            />
          </Route>

          <Route path="/bidding" element={<BiddingMainPage />} />
          <Route path="/bidding/:userid/addcar" element={<BiddingAddCar />} />
          <Route
            path="/bidding/:beadingCarId/bideditcar"
            element={<BiddingEditCar />}
          />
          <Route
            path="/inspector/users/car/:saleCarId"
            element={<UserSaleCarAdd />}
          />
          <Route path="/bidding/:id/:carid/settimer" element={<SetTimer />} />
          <Route
            path="/car/:CarId/pendingreq"
            element={<BiddingDealerPendingReq />}
          />
          <Route
            path="/bidding/:beadingCarId/uploadimage"
            element={<BiddingEditImage />}
          />

          <Route
            path="/bidding/:beadingCarId/update/image"
            element={<UploadImages3 />}
          />

          {/* <Route path="/bidding/:carId/uploadimage" element={<UploadImages3 />} /> */}
          {/* <Route path="/bidding/:carId/:id/editimage" element={<EditImage />} /> */}
          <Route
            element={
              <SalePersonMiddleware
                allowedRoles={[...Object.values(onlySeller)]}
              />
            }
          >
            <Route path="/Seller/UserRequest/Edit/:userFormId" element={<SalerUserSaleReqEdit />} />
            <Route path="/seller/request/:status" element={<AdminUserReq />} />
            <Route
              path="/Seller/ChangePassword"
              element={<SalerChangePassword />}
            />
            <Route path="/sales/salesDealers" element={<SalesDealer />} />
            <Route path="/sales/biddingcar" element={<BiddingDealerCars />} />
            <Route
              path="/sale/carverify/:beadingCarId"
              element={<CarVerify />}
            />
            <Route
              path="/sale/inspection/report/:beadingCarId"
              element={<FinalReport />}
            />
            <Route
              path="/seller/edit/:userid/:salesPersonId"
              element={<SalerEdit />}
            />
            <Route
              path="/sale/dealer/edit/:userid/:id"
              element={<AdminDealerEdit />}
            />
            <Route path="/seller/info/:userId" element={<AdminSalesInfo />} />
            <Route path="/sale/dealer/info/:id" element={<AdminDealerInfo />} />
          </Route>
          <Route path="/user/:userid/favorite" element={<FavoritePage />} />
          <Route path="/sellcarlist" element={<SellCarList />} />
          <Route path="/sellcarform" element={<SellCarForm />} />

          <Route path="/user/sell/edit/:userFormId" element={<EditSellForm/>} />


          <Route path="/user" element={<UserInfo />} />
        </Route>
        <Route path="/premiumcars" element={<PremiumCars />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/DealerContact" element={<DealerContact />} />
        {/* <Route path="/trans" element={<CardDetailss/>}/> */}
        <Route element={<AppLayout2 />}>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/cookiepolicy" element={<CookiePolicy />} />
        </Route>
      </Routes>
    </>
  );
}
