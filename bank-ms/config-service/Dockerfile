
FROM amazoncorretto:21
COPY target/config-service-0.0.1-SNAPSHOT.jar config-service.jar
EXPOSE 9999
ENTRYPOINT ["java", "-jar", "config-service.jar"]   