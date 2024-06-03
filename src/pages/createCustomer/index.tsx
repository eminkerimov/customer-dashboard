import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Grid, TextField } from "@mui/material";
import "./style.scss";
import { Customer, Register } from "../../types/types";
import { addCustomer } from "../../redux/reducers/customersReducer";
import CustomInput from "../../components/customInput";
import Card from "../../assets/images/new-card.png";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  birthDate: yup.string().required("Birth date is required"),
  gsmNumber: yup.string().required("GSM Number is required"),
  cardNumber: yup.string().required("Debit Card Number is required"),
});

const CreateCustomer = () => {
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
    { label: "Name", type: "text", name: "name", error: errors.name },
    { label: "Surname", type: "text", name: "surname", error: errors.surname },
    {
      label: "Birth Date",
      type: "date",
      name: "birthDate",
      error: errors.birthDate,
    },
    {
      label: "GSM Number",
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
            Generate Debit Card
          </SecondaryButton>
        </Grid>
        <Grid item xs={10} className="cardImageContainer">
          <img src={Card} alt="Card" className="cardImage" />
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
            Create Customer
          </MainButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCustomer;
