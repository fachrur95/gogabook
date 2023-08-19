export interface IEventDeleteWorker {
  path: string | null;
  variant?: "default" | "success" | "error",
  id: string | null;
  message: string | null;
  progress?: number;
}

export type WorkerPathType = "sales-invoice" | "sales-order" | "sales-quotation" | "sales-delivery" | "sales-return";

export type DeleteWorkerEventType = {
  route: "procedure";
  path: WorkerPathType;
  data: string[];
}