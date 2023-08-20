import { memo } from "react";
import Spline from "@splinetool/react-spline";

const Spline3dCard = memo(function Spline3dCard({ src }) {
  return <Spline scene={src} />;
});

export default Spline3dCard;
