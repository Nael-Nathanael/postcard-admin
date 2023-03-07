/* eslint-disable no-unused-vars */
import setQueryParams from "@/helpers/setQueryParams";
import { ServiceConfigImportantProps } from "..";

const  ServiceDashboardConfig: ServiceDashboardConfigMethods = {
  GetFlow: (props) => ({
    url: `${process.env["NEXT_PUBLIC_API_URL"]}/dashboard/flow` + setQueryParams(props.queryParams ?? {}),
    method: "GET",
  }),
};

export abstract class ServiceDashboardConfigMethods {
  abstract GetFlow: (props: ServiceDashboardConfigProps["GetFlow"]) => ServiceConfigImportantProps;
}

export abstract class ServiceDashboardConfigProps {
  abstract GetFlow: {
    queryParams?: {
      limit?: number,
      page?: number
    },  
  }
}

export default ServiceDashboardConfig;
