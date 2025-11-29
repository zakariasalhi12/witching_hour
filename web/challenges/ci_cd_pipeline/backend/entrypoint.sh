#!/bin/sh
while true; do
    echo "Starting Spring Boot app..."
    java -XX:+UnlockExperimentalVMOptions -XX:+UseContainerSupport -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar &
    APP_PID=$!
    sleep 300
    echo "Stopping app..."
    kill $APP_PID
    wait $APP_PID 2>/dev/null
    echo "Restarting app..."
done
