# Usa a imagem do Node.js oficial como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Expõe a porta usada pelo Vue.js
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
