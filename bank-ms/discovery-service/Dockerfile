FROM maven:3.9.8-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/target/customer-service-0.0.1-SNAPSHOT.jar ./discovery-service.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "discovery-service.jar"] 