import React from "react";
import path from "path";

import Landau from "@landaujs/landau";

import NetCup from "./index";

const outputPath = {
  path: path.join(__dirname, "../output/net_cup.stl"),
};
Landau.render(<NetCup />, outputPath);
