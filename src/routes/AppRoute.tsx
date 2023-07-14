import { Route, Routes } from "react-router-dom";
import { DefaultRouter } from "./defaultRouter";
import { RegisterProfs } from "../pages/RegisterProfs";
import { ProfsListWithPDF } from "../pages/ProfsListWithPDF";
import { HomePage } from "../pages/HomePage";
import { UpdateProfessorData } from "../pages/UpdateProfessorData";


export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<DefaultRouter />}>
        <Route path="/RegisterProfs" element={<RegisterProfs />}></Route>
        <Route path="/ProfsListWithPDF" element={<ProfsListWithPDF />}></Route>
        <Route
          path="/UpdateProfessorData"
          element={<UpdateProfessorData />}
        ></Route>
      </Route>
    </Routes>
  );
};
//UpdateProfs
