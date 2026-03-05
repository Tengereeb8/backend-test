import fs from "node:fs/promises";

export const readBooks = async () => {
  try {
    const data = await fs.readFile("./books.json", { encoding: "utf-8" });
    return data;
  } catch (err) {
    console.log(err);
  }
};
