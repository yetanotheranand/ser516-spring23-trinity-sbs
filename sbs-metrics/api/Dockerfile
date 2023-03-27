FROM maven:3.9.0-eclipse-temurin-19 AS builder
RUN mkdir /sbs
COPY ./pom.xml /sbs
COPY ./src /sbs/src
WORKDIR /sbs
RUN mvn clean package -DskipTests --quiet

FROM eclipse-temurin:19.0.2_7-jre-jammy AS dev
ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
RUN mkdir /opt/sbs
COPY --from=builder /sbs/target/sbs-metrics-api-1.0-SNAPSHOT-jar-with-dependencies.jar /opt/sbs/application.jar
WORKDIR /opt/sbs
EXPOSE 8080 5005
CMD ["java", "-jar", "/opt/sbs/application.jar"]

FROM eclipse-temurin:19.0.2_7-jre-jammy
RUN mkdir /opt/sbs
RUN groupadd -r javauser && useradd --no-log-init -r -g javauser javauser
COPY --from=builder /sbs/target/sbs-metrics-api-1.0-SNAPSHOT-jar-with-dependencies.jar /opt/sbs/application.jar
WORKDIR /opt/sbs
RUN chown -R javauser:javauser /opt/sbs
EXPOSE 8080
USER javauser
CMD ["java", "-jar", "/opt/sbs/application.jar"]
