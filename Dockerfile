FROM    centos:centos6

#Install node v0.10
RUN curl --silent --location https://rpm.nodesource.com/setup | bash -
RUN yum -y install nodejs 

#Install Build tools to compile native addons
RUN yum -y install gcc-c++ make

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install --production

EXPOSE  8080
CMD ["node", "/src/index.js"]