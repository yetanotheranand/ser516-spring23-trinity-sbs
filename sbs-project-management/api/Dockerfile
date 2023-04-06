FROM maven:3.9.0-eclipse-temurin-19 AS builder
RUN mkdir /sbs
COPY ./pom.xml /sbs
COPY ./src /sbs/src
WORKDIR /sbs
RUN mvn clean package -DskipTests --quiet

FROM eclipse-temurin:19.0.2_7-jre-jammy AS prod
RUN mkdir /opt/sbs
RUN groupadd -r javauser && useradd --no-log-init -r -g javauser javauser
COPY --from=builder /sbs/target/sbs-project-management-api-1.0-SNAPSHOT.jar /opt/sbs/application.jar
WORKDIR /opt/sbs
RUN chown -R javauser:javauser /opt/sbs
EXPOSE 8080
USER javauser
CMD ["java", "-jar", "-Dspring.profiles.active=prod", "/opt/sbs/application.jar"]

FROM prod AS debug
ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
EXPOSE 5005
