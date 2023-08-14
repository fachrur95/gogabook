export interface IEventDeleteWorker {
  path: string;
  variant: "success" | "error",
  id: string;
  message: string;
}