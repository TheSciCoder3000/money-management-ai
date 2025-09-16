import { createClient } from "./client";
import { InvalidUserError } from "./Error/InvalidUserError";

export async function GetUser(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) throw InvalidUserError;

  const token = authHeader.replace("Bearer ", "");

  const {
    data: { user },
    error,
  } = await createClient().auth.getUser(token);

  if (error || !user) throw InvalidUserError;

  return user;
}

export async function GetAuthenticatedClient(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) throw InvalidUserError;

  const token = authHeader.replace("Bearer ", "");

  const supabase = await createClient(token);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw InvalidUserError;

  return supabase;
}
