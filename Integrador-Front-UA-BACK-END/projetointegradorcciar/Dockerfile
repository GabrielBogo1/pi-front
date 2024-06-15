
FROM openjdk:17-jdk-alpine

ENV JAVA_APP_JAR projetointegradorcciar-0.0.1-SNAPSHOT.jar
ENV JAVA_APP_DIR /app

COPY target/${JAVA_APP_JAR} ${JAVA_APP_DIR}/${JAVA_APP_JAR}

EXPOSE 8443

ENTRYPOINT ["java","-jar","/app/projetointegradorcciar-0.0.1-SNAPSHOT.jar"]
