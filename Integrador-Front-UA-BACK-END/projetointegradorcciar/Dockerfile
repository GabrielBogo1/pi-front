
FROM openjdk:17-jdk-alpine

ENV JAVA_APP_JAR projetointegradorcciar-0.0.1-SNAPSHOT.jar
ENV JAVA_APP_DIR /app

COPY target/${JAVA_APP_JAR} ${JAVA_APP_DIR}/${JAVA_APP_JAR}
COPY keycloak-cert.pem /app/keycloak-cert.pem

RUN keytool -import -alias keycloakcert -keystore $JAVA_HOME/lib/security/cacerts -file /app/keycloak-cert.pem -storepass changeit -noprompt

EXPOSE 8443

ENTRYPOINT ["java","-jar","/app/projetointegradorcciar-0.0.1-SNAPSHOT.jar"]
