import { navigate } from "../lib/navigate";
import { page } from "../libs/page";

export default page({
  url: "/home",
  component: ({}) => {
    return (
      <>
        hoME{" "}
        <button
          onClick={() => {
            navigate("/test/lol/l#23");
          }}
        >
          Navigate
        </button>
        <button
          onClick={() => {
            navigate("/master");
          }}
        >
          master
        </button>
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          home
        </button>
      </>
    );
  },
});
