FROM node:21.5.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

EXPOSE 3000

# Add wait-for-it.sh to the image
# COPY wait-for-it.sh /app
# RUN chmod +x /app/wait-for-it.sh

# # Your original startup command
# CMD ["wait-for-it.sh", "postgres:5432", "--", "npm", "start"]

CMD ["npm", "start"]
