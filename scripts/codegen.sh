echo "Generating types..."
npx openapi-generator-cli generate -i ./api.json -g typescript-axios -o ./src/generated-client