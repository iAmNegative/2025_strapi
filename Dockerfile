FROM node:18

WORKDIR /app

# Copy package files and install dependencies using npm
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the Strapi port
EXPOSE 1337

# Start Strapi in development mode
CMD ["npm", "run", "develop"]
