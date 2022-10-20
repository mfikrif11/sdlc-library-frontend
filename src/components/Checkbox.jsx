import { useState } from "react";
import { Box } from "@chakra-ui/react";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxBtnHandler = () => {
    setIsChecked(true);

    if (isChecked === true) {
      return setIsChecked(false);
    }
  };

  return (
    <Box>
      <input type="checkbox" checked={isChecked} onClick={checkboxBtnHandler} />
    </Box>
  );
};

export default Checkbox;
