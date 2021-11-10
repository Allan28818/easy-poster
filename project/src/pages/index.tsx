import withAuth from "../components/withAuth";
import { auth } from "../services/config/firebase";

function Home() {
  return (
    <div>
      <h1 translate="no">Easy poster</h1>
      <p>Create a post or a document in a easy way!</p>
    </div>
  );
}

export default withAuth(Home);
