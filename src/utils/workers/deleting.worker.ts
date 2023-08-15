/* function doSetTimeout(id: string) {
  setTimeout(function () {
    console.log(id);
  }, 5000);
} */

import type { DeleteWorkerEventType, IEventDeleteWorker } from "@/types/worker";
import axios from "axios";

addEventListener("message", (event: MessageEvent<DeleteWorkerEventType>) => {
  const req = event.data;
  if (typeof req.token === "undefined") return;
  switch (req.route) {
    case "procedure":
      for (const id of req.data) {
        const resultMessage: IEventDeleteWorker = {
          id,
          message: `Error Delete id=${id}`,
          variant: "error",
          path: req.path
        };
        /* try {
          await axios.delete<{ message: string }>(
            `${process.env.BACKEND_URL}/api/core/procedure/trans/${id}`,
            { headers: { Authorization: `Bearer ${req.token}` } }
          ).then((response) => {
            const data = response.data;
            resultMessage.variant = "success";
            resultMessage.message = data.message;
          }).catch((err: { response: { data: { message: string } } }) => {
            // console.log(err)
            // return { message: err.response.data.message ?? `Error Delete id=${id}` }
            const data = err.response.data;
            resultMessage.message = data.message ?? `Error Delete id=${id}`;
          });
        } catch (error) {
          console.log({ error, msg: "test" });
        } */
        console.log(id);
        postMessage(resultMessage);
      }
      break;

    default:
      break;
  }
});