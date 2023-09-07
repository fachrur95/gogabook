import type { IMasterItem } from "@/types/masters/masterItem";
import type { IDataOption } from "@/types/options";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CheckboxElement,
  // AutocompleteElement,
  FormContainer,
  RadioButtonGroup,
  // SelectElement,
  SwitchElement,
  TextFieldElement,
  TextareaAutosizeElement,
  // useFieldArray,
  useForm,
} from "react-hook-form-mui";
import Close from "@mui/icons-material/Close";
import AutocompleteMasterItemCategory from "../controls/autocompletes/masters/AutocompleteMasterItemCategory";
import AutocompleteMasterOther from "../controls/autocompletes/masters/AutocompleteMasterOther";
import NumericFormatCustom from "../controls/NumericFormatCustom";
import Collapse from "@mui/material/Collapse";
import { api } from "@/utils/api";
import Link from "next/link";

type MasterItemBodyType = Partial<IMasterItem> & {
  masteritemcategory: IDataOption | null;
  item_brand: IDataOption | null;
  item_tax: IDataOption | null;
  item_uom: IDataOption | null;
  stock: boolean;
  sales: boolean;
  purchase: boolean;
  assembly: boolean;
  disassembly: boolean;
  transfer: boolean;
  beginBalance: boolean;
  adjust: boolean;
  formula: boolean;
  material: boolean;
  modify: boolean;
  isserialbatch: "N" | "S" | "B";
  stockmin: number;
  stockmax: number;
  qtysellmin: number;
  qtysellmax: number;
  sales_price: number;
  isMultipleUnit: boolean;
  masteritem_active: boolean;
};

const defaultValues: MasterItemBodyType = {
  masteritemcategory: null,
  item_brand: null,
  item_tax: null,
  item_uom: null,
  stock: false,
  sales: false,
  purchase: false,
  assembly: false,
  disassembly: false,
  transfer: false,
  beginBalance: false,
  adjust: false,
  formula: false,
  material: false,
  modify: false,
  isserialbatch: "N",
  stockmin: 0,
  stockmax: 0,
  qtysellmin: 0,
  qtysellmax: 0,
  sales_price: 0,
  isMultipleUnit: false,
  masteritem_active: true,
};

interface IMasterItemForm {
  slug: string;
}

const MasterItemForm = (props: IMasterItemForm) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const formContext = useForm<MasterItemBodyType>({ defaultValues });
  const { slug } = props;

  // console.log({ id });

  const {
    // control,
    setValue,
    // getValues,
    formState: { isSubmitting },
    reset,
    // setError,
    watch,
  } = formContext;

  const selectedCategory = watch("itemcategory");

  const { data: dataSelected } = api.masterItem.getUnique.useQuery(
    { id: selectedId ?? "" },
    { enabled: !!selectedId }
  );

  console.log({ selectedCategory });
  console.log({ dataSelected });

  const { data: dataCategory } = api.masterItemCategory.getUnique.useQuery(
    { id: selectedCategory?.id ?? "" },
    { enabled: !!selectedCategory }
  );

  const onSubmit = (data: MasterItemBodyType) => {
    console.log({ data });
  };

  useEffect(() => {
    if (slug !== "form" && slug !== "create") {
      setSelectedId(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (dataSelected) {
      for (const key in dataSelected) {
        if (Object.prototype.hasOwnProperty.call(dataSelected, key)) {
          if (key === "masteritemcategory") {
            setValue("masteritemcategory", {
              id: dataSelected.masteritemcategory?.masteritemcategory_id ?? "-",
              label:
                dataSelected.masteritemcategory
                  ?.masteritemcategory_description ?? "-",
            });
            continue;
          }
          if (key === "item_brand") {
            if (!dataSelected.item_brand) continue;
            setValue("item_brand", {
              id: dataSelected.item_brand.masterother_id ?? "-",
              label: dataSelected.item_brand.masterother_description ?? "-",
            });
            continue;
          }
          if (key === "item_tax") {
            if (!dataSelected.item_tax) continue;
            setValue("item_tax", {
              id: dataSelected.item_tax.masterother_id ?? "-",
              label: dataSelected.item_tax.masterother_description ?? "-",
            });
            continue;
          }
          if (key === "item_uom") {
            if (!dataSelected.item_uom) continue;
            setValue("item_uom", {
              id: dataSelected.item_uom.masterother_id ?? "-",
              label: dataSelected.item_uom.masterother_description ?? "-",
            });
            continue;
          }
          setValue(
            key as keyof Partial<MasterItemBodyType>,
            dataSelected[
              key as keyof Partial<
                Omit<
                  MasterItemBodyType,
                  | "stock"
                  | "sales"
                  | "purchase"
                  | "assembly"
                  | "disassembly"
                  | "transfer"
                  | "beginBalance"
                  | "adjust"
                  | "formula"
                  | "material"
                  | "modify"
                >
              >
            ]
          );
        }
      }
    }
  }, [dataSelected, setValue]);

  useEffect(() => {
    if (dataCategory) {
      setValue(
        "stock",
        dataCategory.masteritemtype?.masteritemtype_isstock ?? false
      );
      setValue(
        "sales",
        dataCategory.masteritemtype?.masteritemtype_issold ?? false
      );
      setValue(
        "purchase",
        dataCategory.masteritemtype?.masteritemtype_ispurchase ?? false
      );
      setValue(
        "assembly",
        dataCategory.masteritemtype?.masteritemtype_isassembly ?? false
      );
      setValue(
        "disassembly",
        dataCategory.masteritemtype?.masteritemtype_isdissassembly ?? false
      );
      setValue(
        "transfer",
        dataCategory.masteritemtype?.masteritemtype_istransfer ?? false
      );
      setValue(
        "beginBalance",
        dataCategory.masteritemtype?.masteritemtype_isbeginbalance ?? false
      );
      setValue(
        "adjust",
        dataCategory.masteritemtype?.masteritemtype_isadjustment ?? false
      );
      setValue(
        "formula",
        dataCategory.masteritemtype?.masteritemtype_isformula ?? false
      );
      setValue(
        "material",
        dataCategory.masteritemtype?.masteritemtype_iscomponent ?? false
      );
      setValue(
        "modify",
        dataCategory.masteritemtype?.masteritemtype_ismodifier ?? false
      );
    }
  }, [dataCategory, setValue]);

  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <Link href="/masters/products/items">
          <IconButton>
            <Close />
          </IconButton>
        </Link>
        <Typography variant="h6">Master Item</Typography>
      </div>
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <div className="grid gap-4">
          <Box
            component={Paper}
            className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3"
          >
            <TextFieldElement
              name="masteritem_description"
              label="Code"
              required
            />
            <TextFieldElement
              name="masteritem_alias"
              label="Description"
              required
            />
          </Box>
          <Box
            component={Paper}
            className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3"
          >
            <AutocompleteMasterItemCategory
              name="masteritemcategory"
              label="Item Category"
              required
            />
            <Box className="col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <CheckboxElement disabled label="Stock" name="stock" />
              <CheckboxElement disabled label="Sales" name="sales" />
              <CheckboxElement disabled label="Purchase" name="purchase" />
              <CheckboxElement disabled label="Assembly" name="assembly" />
              <CheckboxElement
                disabled
                label="Disassembly"
                name="disassembly"
              />
              <CheckboxElement disabled label="Transfer" name="transfer" />
              <CheckboxElement
                disabled
                label="Begin. Balance"
                name="beginBalance"
              />
              <CheckboxElement disabled label="Adjust" name="adjust" />
              <CheckboxElement disabled label="Formula" name="formula" />
              <CheckboxElement disabled label="Material" name="material" />
              <CheckboxElement disabled label="Modify" name="modify" />
            </Box>
          </Box>
          <Box
            component={Paper}
            className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3"
          >
            <AutocompleteMasterOther
              name="item_uom"
              label="Unit of measurement"
              required
              type="uom"
            />
            <AutocompleteMasterOther
              name="item_tax"
              label="Tax"
              required
              type="tax"
            />
            <RadioButtonGroup
              label="Serial/ Batch"
              name="isserialbatch"
              options={[
                {
                  id: "N",
                  label: "No",
                },
                {
                  id: "S",
                  label: "Serialize",
                },
                {
                  id: "B",
                  label: "Batch",
                },
              ]}
              row
              required
            />
            <AutocompleteMasterOther
              name="item_brand"
              label="Brand"
              type="brand"
            />
            <TextFieldElement name="barcode" label="Barcode" />
            <TextFieldElement
              name="sales_price"
              label="Default Price"
              InputProps={{
                inputComponent: NumericFormatCustom as never,
              }}
            />
          </Box>
          <Box
            component={Paper}
            className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3"
          >
            <TextFieldElement
              name="stockmin"
              label="Minimum Stock"
              InputProps={{
                inputComponent: NumericFormatCustom as never,
              }}
            />
            <TextFieldElement
              name="stockmax"
              label="Maximum Stock"
              InputProps={{
                inputComponent: NumericFormatCustom as never,
              }}
            />
            <TextFieldElement
              name="qtysellmin"
              label="Minimum Sales Qty"
              className="col-start-1"
              InputProps={{
                inputComponent: NumericFormatCustom as never,
              }}
            />
            <TextFieldElement
              name="qtysellmax"
              label="Maximum Sales Qty"
              InputProps={{
                inputComponent: NumericFormatCustom as never,
              }}
            />
            <TextareaAutosizeElement
              name="note"
              label="Note"
              rows={3}
              className="col-start-1"
            />
            <SwitchElement name="masteritem_active" label="Active" />
          </Box>
          <Box
            component={Paper}
            className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3"
          >
            <CheckboxElement label="Multi Satuan?" name="isMultipleUnit" />
            <Collapse
              in={watch("isMultipleUnit")}
              className="col-span-3 col-start-1"
            >
              Testing dulu
            </Collapse>
          </Box>
          <Box className="flex flex-col justify-between md:flex-row">
            <div></div>
            <div>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                Save
              </Button>
            </div>
          </Box>
        </div>
      </FormContainer>
    </>
  );
};

export default MasterItemForm;
