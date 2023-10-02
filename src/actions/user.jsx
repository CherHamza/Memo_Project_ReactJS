import { ActionFunctionArgs } from "react-router-dom";
import JsonServer from "../services/JsonServer";

export const loadUser = async ({ request }) => {
  console.log(` Dans actionUser`);
  const formData = await request.formData();
//   const article_title = formData.get("article_title") ;
  await JsonServer.loadUser();
  return null;
};