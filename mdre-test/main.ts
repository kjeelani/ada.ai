import * as fs from "fs"

const gpt_json = require("../prompt/output.json")


interface GPTJSON {
    name: string,
    routes: {
        [key: string]: Method
    }
}

interface Method {
    GET?: MethodDescriptor,
    POST?: MethodDescriptor,
    DELETE?: MethodDescriptor
}

interface MethodDescriptor {
    description: string,
    query_strings: {
        [key: string]: Description
    },
    path_parameters: {
        [key: string]: Description
    },
    request_body: JSON,
    response_body: JSON
}

interface Description {
    type: string,
    description: string
}


class GenerateMD {
    json: GPTJSON
    fp: string

    constructor(json: GPTJSON) {
        this.json = json
        this.fp = "output.md"
        fs.writeFileSync(this.fp, `${this.json.name}\n========\n`)
    }

    generate() {
        for(let route in this.json.routes) {
            fs.appendFileSync(this.fp, `\`${route}\`\n\n`)
            this.generate_methods(this.json.routes[route])
            fs.appendFileSync(this.fp, "---\n")
        }
    }

    generate_methods(ctx: Method) {
        if(typeof ctx.GET !== "undefined") {
            fs.appendFileSync(this.fp, `\`GET\` _${ctx.GET.description}_\n\n`)
            this.generate_query_string(ctx.GET)
            this.generate_path_parameter(ctx.GET)
            this.generate_request_body(ctx.GET)
            this.generate_response_body(ctx.GET)
        }

        if(typeof ctx.POST !== "undefined") {
            fs.appendFileSync(this.fp, `\`POST\` _${ctx.POST.description}_\n\n`)
            this.generate_query_string(ctx.POST)
            this.generate_path_parameter(ctx.POST)
            this.generate_request_body(ctx.POST)
            this.generate_response_body(ctx.POST)
        }

        if(typeof ctx.DELETE !== "undefined") {
            fs.appendFileSync(this.fp, `\`DELETE\` _${ctx.DELETE.description}_\n\n`)
            this.generate_query_string(ctx.DELETE)
            this.generate_path_parameter(ctx.DELETE)
            this.generate_request_body(ctx.DELETE)
            this.generate_response_body(ctx.DELETE)
        }

    }

    generate_query_string(ctx: MethodDescriptor) {
        if(Object.keys(ctx.query_strings).length == 0) return

        fs.appendFileSync(this.fp, "|Query Strings|Type|Description|\n|---|---|---|\n")
        for(let query in ctx.query_strings) {
            fs.appendFileSync(
                this.fp, 
                `|_\`${query}\`_|${ctx.query_strings[query].description}|${ctx.query_strings[query].type}|\n`
            )
        }

    }

    generate_path_parameter(ctx: MethodDescriptor) {
        if(Object.keys(ctx.path_parameters).length == 0) return

        fs.appendFileSync(this.fp, "|Path Parameters|Type|Description|\n|---|---|---|\n")
        for(let path in ctx.path_parameters) {
            fs.appendFileSync(
                this.fp,
                `|_\`${path}\`_|${ctx.path_parameters[path].description}|${ctx.path_parameters[path].type}|\n`
            )
        }
    }

    generate_request_body(ctx: MethodDescriptor) {
        if(Object.keys(ctx.request_body).length == 0) return

        fs.appendFileSync(
            this.fp,
`
#### Request Body

\`\`\`json
${ctx.request_body}
\`\`\`
`
        )
    }

    generate_response_body(ctx: MethodDescriptor) {
        fs.appendFileSync(
            this.fp,
`
#### Response Body

\`\`\`json
${ctx.response_body}
\`\`\`
`
        )
    }
}

new GenerateMD(gpt_json).generate()