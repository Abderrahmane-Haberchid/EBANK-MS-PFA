FROM maven:3.9.8-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/target/config-service-0.0.1-SNAPSHOT.jar ./config-service.jar
EXPOSE 9999
ENTRYPOINT ["java", "-jar", "config-service.jar"]   