FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    SLEEP=5 \
    JAVA_OPTS=""

# Add a regular user to run our application so that it doesn't need to run as root
RUN adduser -D -s /bin/sh appuser
WORKDIR /home/appuser

ADD entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh && chown appuser:appuser entrypoint.sh
USER appuser

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 8080

ADD target/*.jar app.jar
