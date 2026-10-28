FROM node:22-alpine
WORKDIR /app
COPY index.mjs ./index.mjs
CMD ["node", "index.mjs"]
