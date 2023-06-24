from mdutils import MdUtils
import json


test_gpt_json = json.load(open("../prompt/output.json"))

class GenerateMD:
    def __init__(self, md_json: dict):
        self.mdjson = md_json
        self.fp = MdUtils(file_name="output", title=md_json["name"])

    def generate(self):
        for route in self.mdjson["routes"].keys():
            self.fp.write(f"`{route}`\n\n")
            self.generate_methods(self.mdjson["routes"][route])
            self.fp.write("---\n")

        self.fp.create_md_file()

    def generate_methods(self, ctx):
        for method in ctx.keys():
            self.fp.write(f"`{method}` _{ctx[method]['description']}_\n\n")
            self.generate_query_string(ctx[method])
            self.generate_path_parameter(ctx[method])
            self.generate_request_body(ctx[method])
            self.generate_response_body(ctx[method])

    def generate_query_string(self, ctx):
        if not len(ctx["query_strings"]):
            return

        self.fp.write("|Query Strings|Type|Description|\n|---|---|---|\n")
        for query in ctx["query_strings"].items():
            self.fp.write(f"|_`{query[0]}`_|{query[1]['type']}|{query[1]['description']}|\n")


    def generate_path_parameter(self, ctx):
        if not len(ctx["path_parameters"]):
            return

        self.fp.write("|Path Parameters|Type|Description|\n|---|---|---|\n")
        for path in ctx["path_parameters"].items():
            self.fp.write(f"|_`{path[0]}`_|{path[1]['type']}|{path[1]['description']}|\n")

    def generate_request_body(self, ctx):
        if not len(ctx["request_body"]):
            return

        self.fp.write(f"""
#### Request Body

```json
{json.loads(ctx["request_body"])}
```\n""")

    def generate_response_body(self, ctx):
        if not len(ctx["response_body"]):
            return

        self.fp.write(f"""
#### Response Body

```json
{json.loads(ctx["response_body"])}
```\n""")


gen = GenerateMD(test_gpt_json)
gen.generate()
