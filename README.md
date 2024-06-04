```
docker run -d \
    --name neo4j \
    -p7474:7474 -p7687:7687 \
    -e NEO4J_AUTH=neo4j/password \
        -e NEO4J_apoc_export_file_enabled=true \
    -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_apoc_import_file_use__neo4j__config=true \
    -e NEO4J_PLUGINS=\[\"apoc\",\"apoc-extended\"\] \
    neo4j
```