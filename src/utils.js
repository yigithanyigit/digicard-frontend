import {icons} from "./assets/icons.js";

export function getIconpath(icon) {
    for (let i = 0; i < icons.length; i++) {
        if (icons[i].id === icon) {
            return icons[i].icon
        }

    }
}