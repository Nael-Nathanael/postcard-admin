/* eslint-disable no-unused-vars */
import axios from "axios";
import { ServiceResponseFull, ServiceSWRDataResponse } from "..";
import ServiceDashboardConfig, { ServiceDashboardConfigProps } from "./config.dashboard";
import ServiceDashboardModel from "./model.dashboard";
import useSWR from "swr";

const ServiceDashboardController = {
  useGetFlow(props: ServiceDashboardConfigProps["GetFlow"]) {
    const data = useSWR(ServiceDashboardConfig.GetFlow(props), (_props) => {
      return axios(_props).then((response: ServiceResponseFull<ServiceDashboardModel["GetFlow"][]>) => response?.data);
    });

    const response: ServiceSWRDataResponse<typeof data.data> = {
      isError: data.error,
      isLoading: !data.data && !data.error,
      isReady: Boolean(data.data && !data.error),
      isValidating: data.isValidating,
      mutate: data.mutate,
      data: data.data,
      isEmpty: data.data?.length === 0,
    };

    return response;
  },
};

export default ServiceDashboardController;