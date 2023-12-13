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
import { useLoginUser } from "../hooks/useLoginUser";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, isLoading, loginUser, user } = useLoginUser();

  const onSubmit = (data) => {
    loginUser(data);
  };

  console.log("USER", user);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="px-3 max-w-[450px]">
        <CardHeader className="justify-center">
          <h3 className="text-xl">Authentication</h3>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            errorMessage={errors.email?.message}
            {...register("email", validationData.email)}
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
          <Button type="submit" fullWidth color="primary">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
