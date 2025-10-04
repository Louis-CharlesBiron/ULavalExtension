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
    sendMessage({type:"antiBloat", value:checked, postLoad:true})
}

export function useGravityAction(checked) {
    sendMessage({type:"useGravity", value:checked, postLoad:true})
}

export function preventInactivity(checked) {
    sendMessage({type:"preventInactivity", value:checked, postLoad:true})
}