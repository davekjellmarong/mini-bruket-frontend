import React from "react";
import Image from "next/image";

interface ImageListProps {
  images: any[];
  setSelectedImage: (value: any) => void;
  selectedImage: any;
  savedImages: any;
  setStepper: (value: number) => void;
  formik: any;
}
const ImagesList = ({
  images,
  setSelectedImage,
  savedImages,
  selectedImage,
  setStepper,
  formik,
}: ImageListProps) => {
  return (
    <div className="flex justify-center max-h-[80px] gap-4 mx-12 ">
      {images?.map((image, index) => (
        <div
          className={`${
            savedImages.includes(image.name) ? "bg-green-500" : ""
          } size-[50px] sm:size-16`}
          key={index}
        >
          <img
            className={`shadow-lg object-scale-down  ${
              savedImages.includes(image.name) ? "opacity-50" : ""
            }`}
            src={URL.createObjectURL(image)}
            onClick={() => {
              setSelectedImage(image);
              setStepper(1);
            }}
            alt={`uploaded-image-${index}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesList;

// ${selectedImage === image ? "size-32 " : "w-16 h-22"}
