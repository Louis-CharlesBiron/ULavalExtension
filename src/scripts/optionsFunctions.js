import { chrome } from "../App";

export function darkModeAction(checked, setter) {
    console.log("darkmode", checked, typeof setter, chrome)
}

export function removeBloatAction(checked, setter) {
    console.log("bloat", checked, typeof setter, chrome)
}

export function useGravityAction(checked, setter) {
    console.log("gravity", checked, typeof setter, chrome)
}