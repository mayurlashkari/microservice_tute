# Use an existing image docker image as base 
FROM  alpine


# Download and install a dependency 
RUN apk add --update redis

# Tell the image what to do 
#as a container

CMD [ "redis-server" ]