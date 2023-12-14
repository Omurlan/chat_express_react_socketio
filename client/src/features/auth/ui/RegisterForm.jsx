import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { validationData } from "../consts/formValidationData";
import { useUser } from "entities/auth";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, registerUser } = useUser();

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="px-3 max-w-[450px]">
        <CardHeader className="justify-center">
          <h3 className="text-xl">Registration</h3>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            errorMessage={errors.email?.message}
            {...register("email", validationData.email)}
            label="Email"
            type="email"
          />
          <Input
            errorMessage={errors.name?.message}
            {...register("name", validationData.name)}
            label="Name"
          />
          <Input
            errorMessage={errors.password?.message}
            {...register("password", validationData.password)}
            label="Password"
          />
        </CardBody>

        <CardFooter>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            type="submit"
            fullWidth
            color="primary"
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
