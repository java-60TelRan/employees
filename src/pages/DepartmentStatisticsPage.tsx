import { Employee } from "../model/dto-types";

import apiClient from "../services/ApiClientJsonServer";
import _ from "lodash";
import DepartmentStatisticsTable from "../components/DepartmentStatisticsTable";
import { getAge } from "../util/functions";
import useEmployeesQuery from "../hooks/useEmployeesQuery";
export interface DepartmentInfo {
  department: string;
  nEmployees: number;
  avgSalary: number;
  avgAge: number;
}
const DepartmentStatisticsPage = () => {
 const {data: employees} = useEmployeesQuery(["employees"], () => apiClient.getAll())
  const groupObj = _.groupBy(employees, "department");
  const depStatistics: DepartmentInfo[] = getDepStatistics(groupObj);
  return (
    <DepartmentStatisticsTable
      depStatistics={depStatistics}
    ></DepartmentStatisticsTable>
  );
};

export default DepartmentStatisticsPage;

function getDepStatistics(
  groupObj: _.Dictionary<Employee[]>
): DepartmentInfo[] {
  return Object.entries(groupObj).map(([key, value]) => ({
    department: key,
    nEmployees: value.length,
    avgSalary: _.round(_.meanBy(value, "salary")),
    avgAge: _.round(_.meanBy(value, (e) => getAge(e.birthDate))),
  }));
}
