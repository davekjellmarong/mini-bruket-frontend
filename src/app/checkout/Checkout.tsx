"use client";
import { OrderMethods } from "@/utils/utils";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { LoginUser, User, UserRQ } from "@/utils/types";
import {
  clearCartInLocalStorage,
  getItemsFromLocalStorage,
  getSavedProductIds,
} from "@/components/cart/Utils";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const stripe = useStripe();
  const elements = useElements();
  const { data: jwt } = useQuery({
    queryKey: ["jwt"],
  });
  const { data: userData } = useQuery<LoginUser>({
    queryKey: ["login-user"],
  });
  console.log(userData);
  const { mutate: createOrder, isPending: loading } = useMutation({
    mutationFn: (values: any) => {
      return OrderMethods.post(values, jwt);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      clearCartInLocalStorage();
      router.push("/min-side/ordre");
      console.log(data);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
  const formik = useFormik({
    initialValues: {
      address: "Kanohallveien 12a",
      city: "Oslo",
      postalCode: "0585",
      amount: 5500.0,
      email: "",
    },

    onSubmit: async (values) => {
      const cardElement: any = elements?.getElement(CardElement);
      const token = await stripe?.createToken(cardElement);
      const productsIds = getSavedProductIds();
      createOrder({
        data: {
          ...values,
          token: token?.token?.id,
          email: userData?.email,
          products: productsIds,
        },
      });
    },
  });
  if (loading) return <Loading />;
  return (
    <section className="mt-32">
      <div className=" max-w-xl">
        <CardElement />
      </div>
      <button type="submit" onClick={formik.submitForm}>
        Bestill
      </button>
    </section>
  );
};
export default Checkout;
