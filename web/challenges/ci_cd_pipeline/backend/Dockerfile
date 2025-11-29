FROM eclipse-temurin:21-jdk-alpine AS builder

RUN apk add --no-cache maven

WORKDIR /app

# Copy maven wrapper & pom first (great for Docker layer caching)
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn

# Copy source code
COPY src src

# Make mvnw executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS final

WORKDIR /app
VOLUME /app/uploads

# Copy the built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Create uploads directory
RUN mkdir -p uploads/avatars uploads/posts

# Copy migrations folder
COPY migrations /app/migrations

# Expose port
EXPOSE 8080
# Entry point
# ENTRYPOINT ["java" -XX:+UnlockExperimentalVMOptions -XX:+UseContainerSupport -Djava.security.egd=file:/dev/./urandom -jar app.jar"]

# instead of pulling new image and running a new container restart the current java program to simulate new deployment
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]