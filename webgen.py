import json
import htmlmin
import shutil

def resolve_file(content, options, components):
    # Search for things like {{name}}
    # and using the options dictionairy
    # Replace the content
    for key, value in options.items():
        content = content.replace("{{" + key + "}}", value)
    
    # Search for things like [[header]]
    # and using the components dictionary
    # replace it
    for comp in components:
        # If content conatins the component
        if f"[[{comp}]]" in content:
        
            # Read the content of the component
            comp_content = open(f"{component_folder}/{comp}.html", "r").read()
            comp_options = components[comp]

            # Resolve that component too
            comp_content = resolve_file(comp_content, comp_options, components)

            # Replace the component with the content
            content = content.replace(f"[[{comp}]]", comp_content)

    return content

watermark = "<!-- website generated using webgen -->\n"

# Read webgen.json and turn into dictionairy
webgen_settings = json.load(open('webgen.json'))

static_folder = webgen_settings['static']
output_folder = webgen_settings['output']

# Remove the contents of the output folder
shutil.rmtree(output_folder, ignore_errors=True)

# Create the output folder
shutil.copytree(static_folder, output_folder)

# Read the input file
for input_file in webgen_settings['inputs']:
    print(f"Processing {input_file}")

    resulting_code = open(input_file).read()

    # Get list of all available components in the component folder
    component_folder = webgen_settings['components']

    # Get all the components
    components = webgen_settings['register']

    resulting_code = resolve_file(resulting_code, webgen_settings['options'], components)

    # Compress the output
    resulting_code = watermark + resulting_code
    # resulting_code = htmlmin.minify(resulting_code)

    # Write to the output file
    output_file = open(webgen_settings['output'] + "/" + input_file, 'w')
    output_file.write(resulting_code)