"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import PageHeading from "@/components/PageHeading";
import React from "react";
import PersonCreateReq, { PersonCreateValidation } from "@/models/Person/PersonCreateReq";
import { errorHandler, SaqibAPIsClient } from "@/axios/SaqibAPIsClient";
import { PersonApi } from "@/services/PersonApi";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import SubmitButton from "@/components/SubmitButton";
import { Genders } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";

function PersonCreateComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PersonCreateValidation>>({
    resolver: zodResolver(PersonCreateValidation),
    defaultValues: {
      ...new PersonCreateReq(),
    },
  });

  const onSubmit = async (values: z.infer<typeof PersonCreateValidation>) => {
    setIsLoading(true);
    console.log(values);
    PersonApi.create(values)
      .then((res) => router.push("/persons/search"))
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <PageHeading text="Create Person" />
          <section className="space-y-4">
            {/* First Name and Last Name */}
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstName"
                placeholder="John"
                label="First Name"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastName"
                placeholder="Doe"
                label="Last Name"
              />
            </div>
            {/* First Name and Last Name */}
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                placeholder="1112221111"
                label="Phone"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                placeholder="email@domain.com"
                label="Email"
              />
            </div>
            {/* Date of birth and Gender */}
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="dateOfBirth"
                //placeholder="email@domain.com"
                label="Date of Birth"
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Select gender"
              >
                {Genders.map((gender, i) => (
                  <SelectItem key={gender.key} value={gender.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      {/* <Image
                    src={gender.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  /> */}
                      <p>{gender.value}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
            {/* Is active and Image url */}
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="isActive"
                label="Active"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="imageUrl"
                placeholder="image url"
                label="Image Url"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="city"
                placeholder="City"
                label="City"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="state"
                placeholder="State"
                label="State"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                placeholder="Notes"
                label="Notes"
              />
            </div>
          </section>
          <SubmitButton isLoading={isLoading}>Create Person</SubmitButton>
        </form>
      </Form>
    </div>
  );
}

export default PersonCreateComponent;
