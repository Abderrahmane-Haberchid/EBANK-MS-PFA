

FROM maven:3.9.8-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/target/account-service-0.0.1-SNAPSHOT.jar ./account-service.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "account-service.jar"]