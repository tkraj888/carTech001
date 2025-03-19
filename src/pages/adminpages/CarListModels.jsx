/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import TableComponent from "../../components/table/TableComponent";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CarModelsForm } from "./CarModelsForm";
import { Link} from "react-router-dom";
import EditCarForm from "../adminpages/EdiCarForm";
import {
  useGetAllBrandsQuery,
  useDeleteCarBrandsMutation,
} from "../../services/brandAPI";

const getInitialCarList = () => {
  const data = JSON.parse(localStorage.getItem("carList")) || [];
  return data;
};

const saveCarListToStorage = (carList) => {
  localStorage.setItem("carList", JSON.stringify(carList));
};

const getNextBrandDataId = () => {
  const carList = getInitialCarList();
  const ids = carList.map((car) => car.brandDataId);
  const maxId = Math.max(0, ...ids);
  return maxId + 1;
};

const CarListModels = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const { data, refetch, error } = useGetAllBrandsQuery({ pageNo,pageSize });
  const [deleteCarBrands] = useDeleteCarBrandsMutation();
  const [carList, setCarList] = useState(getInitialCarList());
  const [open, setOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    if (data) {
      const updatedCarList = data?.list?.map((item) => ({
        brandDataId: item.brandDataId,
        brand: item.brand,
        variant: item.variant,
        subVariant: item.subVariant,
      }));
      setCarList(updatedCarList);
      saveCarListToStorage(updatedCarList);
    }
  }, [data]);

  const addCar = (newCar) => {
    const newCarWithId = {
      ...newCar,
      brandDataId: getNextBrandDataId(),
    };
    const updatedCarList = [...carList, newCarWithId];
    setCarList(updatedCarList);
    saveCarListToStorage(updatedCarList);
  };

  const updateCar = (updatedCar) => {
    const updatedCarList = carList.map((car) =>
      car.brandDataId === updatedCar.brandDataId ? updatedCar : car
    );
    setCarList(updatedCarList);
    saveCarListToStorage(updatedCarList);
    refetch();
  };

  const handleOpen = (carId) => {
    setSelectedCarId(carId);
    setOpen(!open);
  };

  const deleteCar = async () => {
    try {
      await deleteCarBrands(selectedCarId).unwrap();
      const updatedCarList = carList.filter(
        (car) => car.brandDataId !== selectedCarId
      );
      setCarList(updatedCarList);
      saveCarListToStorage(updatedCarList);
      refetch();
      setOpen(false);
    } catch (error) {
      // console.error("Failed to delete the car brand:", error);
    }
  };
  const nextHandler = () => {
    if (!error) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  const prevHandler = () => {
    if (pageNo > 0) {
      setPageNo((prevPageNo) => prevPageNo - 1);
    }
  };

  const columns = [
     {
      Header: "Sr. No",
      accessor: "serialNumber",
      Cell: (cell) => {
        const { pageSize } = cell.state; // Assuming you're using React Table's useTable hook
        const serialNumber = pageNo * pageSize + cell.row.index + 1;
        return serialNumber;
      },
    },
    {
      Header: "ID",
      accessor: "brandDataId",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model ",
      accessor: "variant",
    },
    {
      Header: "Variant",
      accessor: "subVariant",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => {
        const car = cell.row.original;
        return (
          <div className="flex gap-2 justify-center items-center">
            <EditCarForm
              initialData={car}
              brandDataId={cell.row.values.brandDataId}
              onSave={updateCar}
            />
            <Button
              color="red"
              onClick={() => handleOpen(cell.row.values.brandDataId)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Car Variants List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See Information About Car Variants
              </Typography>
              <Typography className="hidden xl:block ">
        <div className="flex">
      <Link to={"/"}>
              <p className="hover:text-blue-900"> Home </p> 
              </Link>
               /
              <p>CarModels</p>
              
              </div>
      </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <CarModelsForm addCar={addCar} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="md:overflow-auto overflow-scroll px-1">
          <TableComponent columns={columns} data={carList} className="" />
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="medium"
            color="blue-gray"
            className="font-normal"
          >
            Page {pageNo + 1}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={pageNo <= 0}
              onClick={prevHandler}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={nextHandler}
              disabled={data?.list?.length < pageSize}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex justify-center">
          <p className="font-semibold text-xl">
            Are you sure you want to delete?
          </p>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={deleteCar}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CarListModels;
