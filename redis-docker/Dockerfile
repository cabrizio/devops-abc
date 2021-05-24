FROM redis:latest
WORKDIR /opt/redis
COPY config/redis.conf /opt/redis/redis.conf
CMD [ "redis-server", "/opt/redis/redis.conf" ]