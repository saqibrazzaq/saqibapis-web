import React from "react";

import { Button } from "../ui/button";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

type ButtonPropsTableNavigation = {
  type: "First" | "Previous" | "Next" | "Last";
  disabled: boolean;
  click: () => void;
};

function TableNavigationButton({ type, disabled, click }: ButtonPropsTableNavigation) {
  return (
    <Button variant="outline" size="sm" onClick={click} disabled={disabled}>
      {type == "First" && <ChevronFirst size={"16px"} />}
      {type == "Previous" && <ChevronLeft size={"16px"} />}
      {type == "Next" && <ChevronRight size={"16px"} />}
      {type == "Last" && <ChevronLast size={"16px"} />}
    </Button>
  );
}

export default TableNavigationButton;
