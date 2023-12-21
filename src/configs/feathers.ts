// IMPORT FEATHERS CLIENT / REST ETC
import auth from "@feathersjs/authentication-client";
import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import axios from "axios";
import { API_URL } from "../utils/statics";

// CONFIGURE FEATHERS
const feathersClient = feathers();

// CONFIGURE REST CLIENT
const restClient = rest(API_URL);

// CONFIGURE AUTHENTICATION
feathersClient.configure(restClient.axios(axios));

feathersClient.configure(
	auth({
		storage: window.localStorage,
		storageKey: "feathers-react-jwt",
	})
);
export default feathersClient;
