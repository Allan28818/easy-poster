import withAuth from "../components/withAuth";
import { useAuth } from "../hooks/useAuth";
import { generateTimeMessage } from "../services/generateTimeMessage";

function Home() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <h1 translate="no" className="title">
        Easy poster
      </h1>
      <h3>{`${generateTimeMessage()} ${
        user.displayName ? user.displayName : ""
      }`}</h3>
    </div>
  );
}

export default withAuth(Home);
