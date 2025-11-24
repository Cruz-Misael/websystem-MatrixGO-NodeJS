# Imagem base leve
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar package.json
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm install --production

# Copiar o restante do código
COPY ./src ./src

# Expor a porta da API
EXPOSE 3001

# Comando de execução
CMD ["npm", "start"]
