import MyContext from "./context";

import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<MyContext> = async ({ context: { volunteer } }) => {
    if (!volunteer) return false;
    return true;
};

export default authChecker;