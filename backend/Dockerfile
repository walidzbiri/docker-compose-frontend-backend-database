FROM node:12.13.0

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm install

ADD . ./

# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the port
EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]