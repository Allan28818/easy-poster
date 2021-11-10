import withAuth from "../components/withAuth";
import { auth } from "../services/config/firebase";

function Home() {
  console.log("auth.currentUser [index.tsx]", auth.currentUser);
  return (
    <div>
      <h1 translate="no">Easy poster</h1>
      <p>Create a post or a document in a easy way!</p>
    </div>
  );
}

export default withAuth(Home);
