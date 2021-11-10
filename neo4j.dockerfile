# You need start it via docker-compose, 'cause this image doesn't apply specific to backend application actions
# This image is just extended default neo4j:enterprise image with APOC library
# It's needed to avoid runtime library downloading via NEO4JLABS_PLUGINS env variable on every container start
FROM neo4j:enterprise

WORKDIR /var/lib/neo4j/plugins
RUN wget https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/4.3.0.3/apoc-4.3.0.3-all.jar
