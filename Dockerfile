FROM node:8.9.4

WORKDIR /home/node/app

ADD entrypoint.sh /

USER node

ENTRYPOINT ["sh", "/entrypoint.sh"]
