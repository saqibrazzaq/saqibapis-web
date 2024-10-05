"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PageHeading from "@/components/PageHeading";
import React from "react";
import { PersonApi } from "@/services/PersonApi";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import SubmitButton from "@/components/SubmitButton";
import { Genders } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import PersonRes from "@/models/Person/PersonRes";
import PersonEditReq, { PersonEditValidation } from "@/models/Person/PersonEditReq";
import { DropdownApi } from "@/services/DropdownApi";
import { CustomCombobox } from "@/components/CustomCombobox";
import { DropdownRes } from "@/models/Dropdowns/DropdownDtos";

function PersonEditComponent() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState<PersonRes>();
  const [states, setStates] = useState<DropdownRes[]>([]);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const handleCitySearchChanged = async (value: string) => {
    DropdownApi.getStates({ searchText: value })
      .then((res) => setStates(res))
      .catch((error) => console.log(error));
  };

  function searchStatesDropdown() {
    // console.log("loading states...");
    DropdownApi.getStates()
      .then((res) => {
        setStates(res);
        // console.log("Got states");
      })
      .catch((error) => console.log(error));
  }

  function loadPerson() {
    // console.log("Loading person...");
    PersonApi.get(id)
      .then((res) => {
        setPerson(res);
        // console.log("Got person");
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    searchStatesDropdown();
    setDropdownsLoaded(true);
  }, [id]);

  useEffect(() => {
    loadPerson();
  }, [dropdownsLoaded == true]);

  const form = useForm<z.infer<typeof PersonEditValidation>>({
    resolver: zodResolver(PersonEditValidation),
    defaultValues: {
      ...new PersonEditReq(),
    },
    values: person,
  });

  const onSubmit = async (values: z.infer<typeof PersonEditValidation>) => {
    setIsLoading(true);
    console.log(values);
    PersonApi.update(values)
      .then((res) => {
        // router.push(`/persons/${id}/edit`);
        // router.push(`/persons/search`);
        router.back();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <PageHeading text="Edit Person" />
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
              <FormField
                control={form.control}
                name="stateId"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 mt-2">
                    <FormLabel>State</FormLabel>
                    <CustomCombobox
                      className="w-full"
                      items={states}
                      onSelect={(value) => {
                        form.setValue("stateId", value);
                        // console.log("selected value: " + value);
                      }}
                      onSearchChange={handleCitySearchChanged}
                      value={field.value}
                      searchPlaceholder="Search state..."
                    />

                    <FormMessage />
                  </FormItem>
                )}
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
          <SubmitButton isLoading={isLoading}>Update Person</SubmitButton>
        </form>
      </Form>
    </div>
  );
}

export default PersonEditComponent;
