"use client";

import BackButton from "@/components/BackButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import DeleteConfirmationDialog from "@/components/DeleteConfirmation";
import PageHeading from "@/components/PageHeading";
import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import CountryEditReq, { CountryEditValidation } from "@/models/Country/CountryEditReq";
import CountryRes from "@/models/Country/CountryRes";
import { CountryApi } from "@/services/CountryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

function CountryEditComponent() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState<CountryRes>();

  function loadCountry() {
    if (id) {
      CountryApi.get(id)
        .then((res) => {
          setCountry(res);
        })
        .catch((error) => console.log(error));
    }
  }

  function deleteCountry() {
    if (id) {
      CountryApi.delete(id)
        .then((res) => {
          toast.info("Country deleted successfully.", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    loadCountry();
  }, [id]);

  const form = useForm<z.infer<typeof CountryEditValidation>>({
    resolver: zodResolver(CountryEditValidation),
    defaultValues: {
      ...new CountryEditReq(),
    },
    values: country,
  });

  const onSubmit = async (values: z.infer<typeof CountryEditValidation>) => {
    setIsLoading(true);
    // console.log(values);
    if (id) {
      CountryApi.update(values)
        .then((res) => {
          toast.success("Country updated successfully", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      CountryApi.create(values)
        .then((res) => {
          toast.success("Country created successfully", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6 mt-2">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div>
              {id ? <PageHeading text="Edit Country" /> : <PageHeading text="Create Country" />}
            </div>
            <div className="flex items-center space-x-2">
              <BackButton />
              <SubmitButton isLoading={isLoading}>
                {id ? "Update Country" : "Create Country"}
              </SubmitButton>
              {id && (
                <DeleteConfirmationDialog
                  deleteItemName={`Country ${country?.name}`}
                  onDeleteClick={deleteCountry}
                />
              )}
            </div>
          </div>
          <section className="space-y-4">
            {/* Name and Code */}
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                placeholder="Name"
                label="Name"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="code"
                placeholder="Code"
                label="Code"
              />
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}

export default CountryEditComponent;
