```
docker run -d \
    --name neo4j \
    -p7474:7474 -p7687:7687 \
    -e NEO4J_AUTH=neo4j/password \
    neo4j
```