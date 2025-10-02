import { MESSAGE_DESTINATIONS, sendMessage } from "../utils/utils";
import { chrome } from "./DEV_fakeChrome";

/**
 *  {
 *   type: the function name
 *   value: parameter value
 *   postLoad: whether the function needs to be run once the content is loaded
 *  }
 */

export function darkModeAction(checked) {
    sendMessage({type:"darkMode", value:checked}, MESSAGE_DESTINATIONS.ALL)
}

export function removeBloatAction(checked) {
    console.log("bloat", checked, typeof setter, chrome)
    sendMessage({type:"antiBloat", value:checked, postLoad:true})
}

export function useGravityAction(checked, setter) {
    sendMessage({type:"useGravity", value:checked, postLoad:true})
    console.log("gravity", checked, typeof setter, chrome)
}