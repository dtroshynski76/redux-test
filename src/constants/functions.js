/**
 * Gets the value at the given location from the given object. If no such value found, returns the given fallback value
 * @param {Object} state Current state object
 * @param {string} location Period-separated string representing the desired value's location in the state object
 * @param {*} fallbackValue Value to return if the value at the given location does not exist
 * @example
 * // find the value in the object 'state' at the location 'foo.bar.baz'; return empty array if not found
 * getJS(state, 'foo.bar.baz', []);
 */
export function getJS(state, location = '', fallbackValue = {}) {
    const locationArray = location.split('.');

    if (locationArray.length < 1) {
        return fallbackValue;
    }

    let value = state[locationArray[0]];

    for (let i = 1; i < locationArray.length; i++) {
        if (!value) {
            return fallbackValue;
        }

        value = value[locationArray[i]];
    }

    return value;
}
