
FROM amazoncorretto:21
WORKDIR /app
COPY target/account-service-0.0.1-SNAPSHOT.jar ./account-service.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "account-service.jar"]