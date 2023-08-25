import axios from "axios";

export default async (error) => {
  await axios
    .post(
      "https://hooks.slack.com/services/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",
      { text: `Error ${error.name}.\n${error.message}"` },
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    )
    .then((response) => console.log(response))
    .catch((error) => console.log("error", error));
};
