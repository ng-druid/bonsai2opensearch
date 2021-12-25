Run program to generate export file from bonsai clip.

```bash
node index.js
```

Upload exported json file to aws open search using curl bulk api.

```bash
cd exports
curl -XPOST -u 'username:password' 'https://search-XXX.us-east-1.es.amazonaws.com/_bulk' --data-binary @XXX.json -H 'Content-Type: application/json'
```