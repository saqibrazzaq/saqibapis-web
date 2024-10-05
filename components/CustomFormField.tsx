/* eslint-disable no-unused-vars */
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";

import { Checkbox } from "./ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { PhoneInput } from "./ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import React from "react";
import { Button } from "./ui/button";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { DropdownRes } from "@/models/Dropdowns/DropdownDtos";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  DROPDOWN = "dropdown",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  dropdownData?: DropdownRes[];
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input placeholder={props.placeholder} {...field} className="" />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className=""
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border h-9 items-center">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              selected={field.value as Date}
              onChange={(date: Date | null) => {
                field.onChange(date);
                console.log(date);
              }}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "yyyy-MM-dd"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
            <FormControl>
              <SelectTrigger className="">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.DROPDOWN:
      return (
        // <FormControl>
        //   <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
        //     <FormControl>
        //       <SelectTrigger className="">
        //         <SelectValue placeholder={props.placeholder} />
        //       </SelectTrigger>
        //     </FormControl>
        //     <SelectContent className="">{props.children}</SelectContent>
        //   </Select>
        // </FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
              >
                {field.value
                  ? props.dropdownData?.find((ddItem) => ddItem.value === field.value)?.label
                  : props.placeholder}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {props.dropdownData?.map((ddItem) => (
                    <CommandItem
                      value={ddItem.label}
                      key={ddItem.value}
                      onSelect={() => {
                        // form.setValue("language", ddItem.value)
                      }}
                    >
                      {ddItem.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          ddItem.value === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
          <RenderInput field={field} props={props} />

          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
