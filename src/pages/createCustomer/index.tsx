import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { Customer, Register } from "../../types/types";
import { addCustomer } from "../../redux/reducers/customersReducer";
import CustomInput from "../../components/customInput";
import Card from "../../assets/images/new-card.png";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";

const CreateCustomer = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    name: yup.string().required(t("name") + " " + t("isRequired")),
    surname: yup.string().required(t("surname") + " " + t("isRequired")),
    birthDate: yup.string().required(t("birthDate") + " " + t("isRequired")),
    gsmNumber: yup.string().required(t("gsmNumber") + " " + t("isRequired")),
    cardNumber: yup
      .string()
      .required(t("debitCardNumber") + " " + t("isRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const generateCardNumber = () => {
    const cardNum = Math.random().toString().slice(2, 18);
    setValue("cardNumber", cardNum);
  };

  const onSubmit = (data: Register) => {
    const customer: Customer = {
      CustomerID: Math.random().toString(),
      Name: data.name,
      Surname: data.surname,
      BirthDate: data.birthDate,
      GSMNumber: data.gsmNumber,
      CardNumber: data.cardNumber,
    };

    dispatch(addCustomer(customer));
  };

  const inputFields = [
    { label: t("name"), type: "text", name: "name", error: errors.name },
    {
      label: t("surname"),
      type: "text",
      name: "surname",
      error: errors.surname,
    },
    {
      label: t("birthDate"),
      type: "date",
      name: "birthDate",
      error: errors.birthDate,
    },
    {
      label: t("gsmNumber"),
      type: "text",
      name: "gsmNumber",
      error: errors.gsmNumber,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="createCustomer">
      <Grid container spacing={2}>
        {inputFields.map((field, index) => (
          <Grid item xs={10} sm={6} key={index}>
            <CustomInput
              label={field.label}
              type={field.type}
              register={register}
              name={field.name}
              error={field.error}
            />
          </Grid>
        ))}
        <Grid item xs={10}>
          <SecondaryButton variant="contained" onClick={generateCardNumber}>
            {t("generateDebitCard")}
          </SecondaryButton>
        </Grid>
        <Grid item xs={10} className="cardImageContainer">
          <img src={Card} alt={t("cardImageAlt")} className="cardImage" />
          <TextField
            {...register("cardNumber")}
            className="cardNumberInput"
            InputLabelProps={{ shrink: true }}
          />
          {errors.cardNumber && (
            <p className="error">{errors.cardNumber.message}</p>
          )}
        </Grid>
        <Grid item xs={10}>
          <MainButton type="submit" variant="contained" color="primary">
            {t("createCustomer")}
          </MainButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCustomer;
