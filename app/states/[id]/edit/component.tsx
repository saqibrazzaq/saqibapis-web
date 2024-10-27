"use client";

import BackButton from "@/components/BackButton";
import { CustomCombobox } from "@/components/CustomCombobox";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import DeleteConfirmationDialog from "@/components/DeleteConfirmation";
import PageHeading from "@/components/PageHeading";
import SubmitButton from "@/components/SubmitButton";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DropdownReq, DropdownRes } from "@/models/Dropdowns/DropdownDtos";
import StateEditReq, { StateEditValidation } from "@/models/State/StateEditReq";
import { StateRes } from "@/models/State/StateRes";
import { DropdownApi } from "@/services/DropdownApi";
import { StateApi } from "@/services/StateApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

function StateEditComponent() {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const countryId = searchParams.get("countryId");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<StateRes>();
  const [countries, setCountries] = useState<DropdownRes[]>([]);

  const handleCountrySearchChanged = async (value: string) => {
    DropdownApi.getCountries({ searchText: value })
      .then((res) => setCountries(res))
      .catch((error) => console.log(error));
  };

  function searchCountriesDropdown(countryId?: string) {
    // console.log("loading countries...");
    DropdownApi.getCountries(new DropdownReq("", countryId))
      .then((res) => {
        setCountries(res);
        // console.log("Got countries");
      })
      .catch((error) => console.log(error));
  }

  function loadState() {
    if (id) {
      StateApi.get(id)
        .then((res) => {
          setState(res);
          searchCountriesDropdown(res.countryId);
        })
        .catch((error) => console.log(error));
    }
  }

  function deleteState() {
    if (id) {
      StateApi.delete(id)
        .then((res) => {
          toast.info("State deleted successfully.", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    loadState();
  }, [id]);

  useEffect(() => {
    if (countryId) searchCountriesDropdown(countryId);
  }, [countryId]);

  const form = useForm<z.infer<typeof StateEditValidation>>({
    resolver: zodResolver(StateEditValidation),
    defaultValues: {
      ...new StateEditReq(countryId ?? ""),
    },
    values: state,
  });

  const onSubmit = async (values: z.infer<typeof StateEditValidation>) => {
    setIsLoading(true);
    // console.log(values);
    if (id) {
      StateApi.update(values)
        .then((res) => {
          toast.success("State updated successfully", { closeOnClick: true });
          router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      StateApi.create(values)
        .then((res) => {
          toast.success("State created successfully", { closeOnClick: true });
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
              {id ? <PageHeading text="Edit State" /> : <PageHeading text="Create State" />}
            </div>
            <div className="flex items-center space-x-2">
              <BackButton />
              <SubmitButton isLoading={isLoading}>
                {id ? "Update State" : "Create State"}
              </SubmitButton>
              {id && (
                <DeleteConfirmationDialog
                  deleteItemName={`State ${state?.name}`}
                  onDeleteClick={deleteState}
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
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 mt-2">
                    <FormLabel>Country</FormLabel>
                    <CustomCombobox
                      className="w-full"
                      items={countries}
                      onSelect={(value) => {
                        form.setValue("countryId", value);
                        // console.log("selected value: " + value);
                      }}
                      onSearchChange={handleCountrySearchChanged}
                      value={field.value}
                      searchPlaceholder="Search country..."
                      unselect={true}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}

export default StateEditComponent;
