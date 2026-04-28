FROM node:16.17.0

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash-completion

# Set working directory
WORKDIR /app
COPY . /app

#Install pm2 and pm2-logrotate
RUN yarn global add pm2
RUN pm2 install pm2-logrotate

#Install dependencies and link
RUN yarn --production --frozen-lockfile && yarn run link

#Build ecosystem.config.js
RUN bash ecosystem-builder.sh

#Expose port 8080
EXPOSE 8080

#Run bash script to start pm2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
