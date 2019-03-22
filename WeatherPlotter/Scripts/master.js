var regexIso8601 = /(19|20|21)\d\d([-/.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])T(\d\d)([:/.])(\d\d)([:/.])(\d\d)/;

function formatDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0])
            if (!isNaN(milliseconds)) {
                input[key] = moment(new Date(milliseconds));
            }
        }
        else if (typeof value === "object") {
            if (value == null) continue;

            // Recurse into object or array
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    formatDateStringsToDates(value[i]);
                }
            }
            else {
                formatDateStringsToDates(value);
            }
        }
    }
};