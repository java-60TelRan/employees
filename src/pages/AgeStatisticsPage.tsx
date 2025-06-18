import { AxiosError } from "axios"
import { Employee } from "../model/dto-types"
import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/ApiClientJsonServer"
import Statistics from "../components/Statistics"

const AgeStatisticsPage = () => {
 const {data: employees} = useQuery<Employee[], AxiosError>({
     queryKey: ["employees"],
     queryFn: () => apiClient.getAll(),
     staleTime: 3600_000
   })
 
   return (
     <Statistics numbers={employees?.map(e => new Date().getFullYear() - new Date(e.birthDate).getFullYear()) || []} interval={10} label={'Age'} ></Statistics>
   )
 }

export default AgeStatisticsPage