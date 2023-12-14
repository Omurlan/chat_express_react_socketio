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

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, loginUser } = useUser();

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="px-3 max-w-[450px]">
        <CardHeader className="justify-center">
          <h3 className="text-xl">Authentication</h3>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            errorMessage={errors.email?.message}
            {...register("email")}
            label="Email"
            type="email"
          />
          <Input
            errorMessage={errors.password?.message}
            {...register("password", validationData.password)}
            label="Password"
          />
        </CardBody>

        <CardFooter>
          <Button isLoading={isLoading} type="submit" fullWidth color="primary">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
