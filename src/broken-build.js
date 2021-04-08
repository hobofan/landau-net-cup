/// Reproduction for https://github.com/jscad/OpenJSCAD.org/issues/786
import React from "react";
import path from "path";

import Landau from "@landaujs/landau";

import { Net, Bottom } from "./index";

const outputPath = {
  path: path.join(__dirname, "../output/net_cup.stl"),
};

// This works:
//
// Landau.render(
//   <union>
//     <Net />
//     <align>
//       <Bottom />
//     </align>
//   </union>,
//   outputPath
// );

// This doesn't
Landau.render(
  <union>
    <Net />
    <Bottom />
  </union>,
  outputPath
);
