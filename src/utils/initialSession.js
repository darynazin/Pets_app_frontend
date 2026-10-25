// Keep the startup request shared, including React StrictMode's effect replay.
export const createInitialSessionLoader = ({ getSession, getUser, getDoctor }) => {
  let request;

  return () => {
    if (!request) {
      request = Promise.resolve().then(async () => {
        const { data: session } = await getSession();
        if (!session.authenticated) return null;

        const role = session.user?.role;
        if (role !== "user" && role !== "doctor") return null;

        const { data: profile } = await (role === "user" ? getUser() : getDoctor());
        return { role, profile };
      });
    }

    return request;
  };
};
