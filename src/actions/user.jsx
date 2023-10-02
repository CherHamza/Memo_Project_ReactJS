import { ActionFunctionArgs } from "react-router-dom";
import JsonServerUser from "../services/JsonServerUser";

export const loadUser = async ({ request }) => {
  console.log(` Dans actionUser`);
  const formData = await request.formData();
//   const article_title = formData.get("article_title") ;
  await JsonServerUser.loadUser();
  return null;
};