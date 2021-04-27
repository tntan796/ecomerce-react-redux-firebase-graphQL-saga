import { withRouter } from "react-router";
import { useAuth } from "../customHooks";

const WithAuth = props => useAuth() && props.children;

export default withRouter(WithAuth);