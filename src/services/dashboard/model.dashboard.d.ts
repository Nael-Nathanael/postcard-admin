export default abstract class ServiceDashboardModel {
  abstract GetFlow: {
    id: number,
    source: string,
    createdAt: Date | string,
    pages: {
      success: number,
      ignored: number
    },
    places: {
      success: number,
      ignored: number
    }
  };
}