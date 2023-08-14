/* function doSetTimeout(id: string) {
  setTimeout(function () {
    console.log(id);
  }, 5000);
} */

import { api } from "../api";

addEventListener("message", async (event: MessageEvent<{ route: "salesPurchase"; data: string[] }>) => {
  const req = event.data;
  const mutation = api[req.route].delete.useMutation();
  switch (req.route) {
    case "salesPurchase":
      for (const id of req.data) {
        // console.log(id);
        await mutation.mutateAsync(
          { id },
          {
            onError: (err) => {
              console.log(err);
              postMessage({
                path: req.route,
                variant: "error",
                id,
                message: err.message
              })
            },
            onSuccess: (data) => {
              console.log(data);
              postMessage({
                path: req.route,
                variant: "success",
                id,
                message: data.message
              })
            },
          }
        );
      }
      break;

    default:
      break;
  }
});