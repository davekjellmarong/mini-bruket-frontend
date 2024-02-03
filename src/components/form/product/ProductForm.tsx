"use client";
import React, { useState } from "react";
import Category from "./Category";
import Color from "./Color";
import { State } from "./State";
import Sex from "./Sex";
import Price from "./Price";
import Size from "./Size";
import Brand from "./Brand";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ProductsMethods,
  fetchCategories,
  fetchColors,
  fetchMaterials,
  fetchSizes,
  fetchTags,
} from "@/utils/utils";
import {
  CategoryRQ,
  ColorsRQ,
  MaterialsRQ,
  SizesRQ,
  TagsRQ,
  User,
} from "@/utils/types";
import { useFormik } from "formik";
import Loading from "@/components/loading/Loading";
import Materials from "./Materials";
import Tags from "./Tags";
import { toast } from "react-toastify";
import CarouselComponent from "@/components/carousel/Carousel";

interface ProductFormProps {
  setSavedImages: any;
  stepper: number;
  formik: any;
  setStepper: (value: number) => void;
}
const ProductForm = ({
  setSavedImages,
  setStepper,
  formik,
  stepper,
}: ProductFormProps) => {
  const { data: colors } = useQuery<ColorsRQ>({
    queryKey: ["colors"],
    queryFn: fetchColors,
  });
  const { data: tags } = useQuery<TagsRQ>({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const { data: categories } = useQuery<CategoryRQ>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { data: materials } = useQuery<MaterialsRQ>({
    queryKey: ["materials"],
    queryFn: fetchMaterials,
  });
  const { data: sizes } = useQuery<SizesRQ>({
    queryKey: ["sizes"],
    queryFn: fetchSizes,
  });
  if (
    !colors?.data ||
    !tags?.data ||
    !categories?.data ||
    !materials?.data ||
    !sizes?.data
  )
    return <Loading />;
  if (stepper)
    return (
      <form className="" onSubmit={formik.handleSubmit}>
        <CarouselComponent>
          <Color formik={formik} colors={colors.data} />
          <Category
            onChangeFunc={() => {
              if (formik.values.colors) {
                setStepper(2);
              }
            }}
            formik={formik}
            categories={categories.data}
          />
          <Size formik={formik} sizes={sizes.data} />
          <Tags
            onChangeFunc={() => {
              if (formik.values.size) {
                setStepper(3);
              }
            }}
            formik={formik}
            tags={tags.data}
          />
          <Sex formik={formik} />
          <State formik={formik} />
          <Materials
            onChangeFunc={() => {
              if (formik.values.state && formik.values.sex) {
                setStepper(4);
              }
            }}
            formik={formik}
            materials={materials.data}
          />
          <Price formik={formik} />
          <Brand formik={formik} />

          <div className="flex justify-between flex-wrap px-10 gap-8">
            <button
              type="submit"
              className=" bg-gray-500 py-2 px-6 text-white rounded w-full"
            >
              Lagre produkt
            </button>
          </div>
        </CarouselComponent>
      </form>
    );
};

export default ProductForm;

{
  /* <button
type="button"
className="border-2 border-gray-400 py-2 px-6 rounded w-full"
>
Forhåndsvisning av produktene
</button> */
}

// <div
// className={`px-10 ${
//   stepper === 1 ? "block" : "sm:hidden block"
// } flex flex-col gap-28 `}
// >
// <Color formik={formik} colors={colors.data} />
// <Category
//   onChangeFunc={() => {
//     if (formik.values.colors) {
//       setStepper(2);
//     }
//   }}
//   formik={formik}
//   categories={categories.data}
// />
// </div>
// <div
// className={`px-10 ${
//   stepper === 2 ? "block" : "sm:hidden block"
// } flex flex-col gap-28 `}
// >
// <Size formik={formik} sizes={sizes.data} />
// <Tags
//   onChangeFunc={() => {
//     if (formik.values.size) {
//       setStepper(3);
//     }
//   }}
//   formik={formik}
//   tags={tags.data}
// />
// </div>
// <div
// className={`px-10 w-full ${
//   stepper === 3 ? "block" : "sm:hidden block"
// } flex flex-col gap-28 justify-start `}
// >
// <Sex formik={formik} />
// <State formik={formik} />
// <Materials
//   onChangeFunc={() => {
//     if (formik.values.state && formik.values.sex) {
//       setStepper(4);
//     }
//   }}
//   formik={formik}
//   materials={materials.data}
// />
// </div>
// <div
// className={`${
//   stepper === 4 ? "block" : "sm:hidden block"
// } flex flex-col gap-28 justify-start `}
// >
// <Price formik={formik} />
// <Brand formik={formik} />
// </div>
