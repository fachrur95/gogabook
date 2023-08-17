export interface IEventDeleteWorker {
  path: string;
  variant: "success" | "error",
  id: string;
  message: string;
}

export type WorkerPathType = "sales-invoice" | "sales-order" | "sales-quotation" | "sales-delivery" | "sales-return";

export type DeleteWorkerEventType = {
  route: "procedure";
  path: WorkerPathType;
  data: string[];
}