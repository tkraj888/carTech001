import {
    Card
  } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
const CardUi = ({children}) => {
  return (
    <Card className="p-0  ">
      {children}
    </Card>
  )
}

export default CardUi
