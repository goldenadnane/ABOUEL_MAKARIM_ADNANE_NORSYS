import {UserManager} from "oidc-client-ts";

const userManager = new UserManager({
    authority: 'http://localhost:8080/realms/DocumentApp',
    client_id: 'DocumentAppClient',
    redirect_uri: 'http://localhost:5173',
    post_logout_redirect_uri: 'http://localhost:5173',
});

export default userManager