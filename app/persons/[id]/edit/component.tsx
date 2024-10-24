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
import { DropdownReq, DropdownRes } from "@/models/Dropdowns/DropdownDtos";
import { toast } from "react-toastify";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/DeleteConfirmation";

function PersonEditComponent() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState<PersonRes>();
  const [states, setStates] = useState<DropdownRes[]>([]);

  const handleStateSearchChanged = async (value: string) => {
    DropdownApi.getStates({ searchText: value })
      .then((res) => setStates(res))
      .catch((error) => console.log(error));
  };

  function searchStatesDropdown(stateId?: string) {
    // console.log("loading states...");
    DropdownApi.getStates(new DropdownReq("", stateId))
      .then((res) => {
        setStates(res);
        // console.log("Got states");
      })
      .catch((error) => console.log(error));
  }

  function loadPerson() {
    if (id) {
      PersonApi.get(id)
        .then((res) => {
          setPerson(res);
          searchStatesDropdown(res.stateId);
          // console.log("Got person");
        })
        .catch((error) => console.log(error));
    }
  }

  function deletePerson() {
    if (id) {
      PersonApi.delete(id)
        .then((res) => {
          toast.info("Person deleted successfully.", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    loadPerson();
    searchStatesDropdown();
  }, [id]);

  const form = useForm<z.infer<typeof PersonEditValidation>>({
    resolver: zodResolver(PersonEditValidation),
    defaultValues: {
      ...new PersonEditReq(),
    },
    values: person,
  });

  const onSubmit = async (values: z.infer<typeof PersonEditValidation>) => {
    setIsLoading(true);
    // console.log(values);
    if (id) {
      PersonApi.update(values)
        .then((res) => {
          toast.success("Person updated successfully", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PersonApi.create(values)
        .then((res) => {
          toast.success("Person created successfully", { closeOnClick: true });
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
              {id ? <PageHeading text="Edit Person" /> : <PageHeading text="Create Person" />}
            </div>
            <div className="flex items-center space-x-2">
              <BackButton />
              <SubmitButton isLoading={isLoading}>
                {id ? "Update Person" : "Create Person"}
              </SubmitButton>
              {id && (
                <DeleteConfirmationDialog
                  deleteItemName={`Person ${person?.firstName} ${person?.lastName} (${person?.email})`}
                  onDeleteClick={deletePerson}
                />
              )}
            </div>
          </div>
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
                      onSearchChange={handleStateSearchChanged}
                      value={field.value}
                      searchPlaceholder="Search state..."
                      unselect={true}
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
        </form>
      </Form>
    </div>
  );
}

export default PersonEditComponent;
