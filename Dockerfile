FROM node:11.13.0

ENV APP_NAME marcel
ENV APP_PATH /opt/${APP_NAME}

# Copy source code
COPY . ${APP_PATH}

VOLUME ${APP_PATH}

# Change working directory
WORKDIR ${APP_PATH}

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8080

# Launch application
CMD ["npm", "start"]
