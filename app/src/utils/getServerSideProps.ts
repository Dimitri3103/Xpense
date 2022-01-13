import nookies from "nookies";
import { auth } from "./firebase/firebaseAdmin";

const serverRuntimeConfig = async (context) => {
  try {
    const cookies = nookies.get(context);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await auth.verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { email: `${email}`, Id: `${uid}` },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {} as never,
    };
  }
};

export default serverRuntimeConfig;
