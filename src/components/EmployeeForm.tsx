import React, { FC } from "react";
import { Employee } from "../model/dto-types";
import { useForm } from "react-hook-form";
import employeesConfig from "../../config/employees-config.json"
import {
  Stack,
  SimpleGrid,
  HStack,
  Field,
  NativeSelect,
  Button,
} from "@chakra-ui/react";
interface Props {
  submitter: (empl: Employee) => void;
}
const EmployeeForm: FC<Props> = ({ submitter }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>();
  return (
    <Stack as="form" onSubmit={handleSubmit(data => submitter(data))}>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 3,
        }}
      >
        <Field.Root invalid={!!errors.department}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              placeholder="Select Department"
              {...register("department", { required: true })}
              
            >
                {employeesConfig.departments.map(d => <option key={d} value={d}>{d}</option>)}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>Department must be selected</Field.ErrorText>
        </Field.Root>
      </SimpleGrid>
      <HStack>
        <Button type="submit">Save</Button>
        <Button type="reset">Reset</Button>
      </HStack>
    </Stack>
  );
};

export default EmployeeForm;
