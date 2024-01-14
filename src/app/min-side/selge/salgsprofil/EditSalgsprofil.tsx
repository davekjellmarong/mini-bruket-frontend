import React from "react";
import { UserBackend, User as UserType } from "@/utils/types";
import {
  tailwindColorsObject,
  tailwindColorsUserButton,
} from "@/utils/constants";
import Products from "@/app/produkter/Products";
import { useQuery } from "@tanstack/react-query";
import { ProductsMethods } from "@/utils/utils";
import EditSalgsprofilHeader from "./EditSalgsprofilHeader";
import {
  Baby,
  Bird,
  HeartStraight,
  Leaf,
  Rainbow,
  Star,
  User,
  UserCircle,
} from "@phosphor-icons/react";
interface EditSalgsprofilProps {
  formik: any;
  id: number;
  dialogRef: React.RefObject<HTMLDialogElement>;
}
const EditSalgsprofil = ({ formik, dialogRef, id }: EditSalgsprofilProps) => {
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return ProductsMethods.getByUserId(id);
    },
  });
  const tailwindColor = tailwindColorsUserButton[formik.values.colorName];
  return (
    <div
      className={`${tailwindColor} h-full w-full flex justify-center items-center`}
    >
      <div className="m-10 relative w-full shadow-2xl rounded bg-white text-center flex flex-col items-center py-10 gap-6">
        {dialogRef && (
          <div className="absolute top-10 left-10">
            <button
              type="button"
              className="rounded-lg border border-sky-600 bg-sky-800 px-5 py-2.5 text-sm font-medium text-sky-100 hover:bg-sky-700 hover:text-white focus:z-10 focus:outline-none focus:ring-0 focus:ring-sky-700"
              onClick={() => {
                dialogRef.current?.showModal();
              }}
            >
              Rediger Editsalgsprofil
            </button>
          </div>
        )}
        <EditSalgsprofilHeader formik={formik} />
        <div className="w-5/6">
          <Products data={data} />
        </div>
      </div>
    </div>
  );
};

export default EditSalgsprofil;