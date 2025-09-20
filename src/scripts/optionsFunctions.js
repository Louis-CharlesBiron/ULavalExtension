import { chrome } from "../App";
import { sendMessage } from "../utils/utils";

export function darkModeAction(checked, setter) {
    console.log("darkmode", checked, typeof setter, chrome)
}

export function removeBloatAction(checked, setter) {
    console.log("bloat", checked, typeof setter, chrome)

    sendMessage({type:"antiBloat", value:checked})
}

export function useGravityAction(checked, setter) {
    console.log("gravity", checked, typeof setter, chrome)
}