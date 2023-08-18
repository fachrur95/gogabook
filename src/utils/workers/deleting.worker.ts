/* function doSetTimeout(id: string) {
  setTimeout(function () {
    console.log(id);
  }, 5000);
} */

import type { DeleteWorkerEventType, IEventDeleteWorker } from "@/types/worker";
import axios from "axios";

addEventListener("message", async (event: MessageEvent<DeleteWorkerEventType>) => {
  const req = event.data;
  switch (req.route) {
    case "procedure":
      for (const id of req.data) {
        const resultMessage: IEventDeleteWorker = {
          id,
          message: `Error Delete id=${id}`,
          variant: "error",
          path: req.path
        };
        await axios.delete<{ message: string }>(`/api/self/procedure?id=${id}`, { withCredentials: true, })
          .then((response) => {
            const data = response.data;
            resultMessage.variant = "success";
            resultMessage.message = data.message;
          }).catch((err: { response: { data: { message: string } } }) => {
            const data = err.response.data;
            resultMessage.message = data.message ?? `Error Delete id=${id}`;
          });
        postMessage(resultMessage);
      }
      break;

    default:
      break;
  }
});