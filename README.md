# criação da imagem docker
docker pull tutum/mongodb
docker build -t desafio:1 .
# Subindo API docker
docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb
comando: docker run -p 8080:3001 -d desafio:1 

