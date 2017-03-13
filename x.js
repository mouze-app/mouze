const xkcdPassword = require("xkcd-password")
const pw = new xkcdPassword()

function generateCode() {
    let code = ""

    pw.generate(function (err, result) {
        code = result.join("-")

        return code
    })
}

console.log(generateCode());
