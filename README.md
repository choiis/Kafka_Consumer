# Kafka_Consumer

Ubuntu 카프카 주키퍼 셋팅

sudo apt update && sudo apt upgrade -y 
sudo apt install openjdk-8-jdk

sudo wget https://downloads.apache.org/kafka/2.4.1/kafka_2.13-2.4.1.tgz
sudo tar xzf kafka_2.13-2.4.1.tgz
sudo mv kafka_2.13-2.4.1 /opt/kafka

주키퍼, 카프카 데몬 등록

sudo vi /etc/systemd/system/zookeeper.service

[Unit]
Description=Apache Zookeeper service
Documentation=http://zookeeper.apache.org
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
ExecStart=/opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties
ExecStop=/opt/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target

sudo vi /etc/systemd/system/kafka.service

[Unit]
Description=Apache Kafka Service
Documentation=http://kafka.apache.org/documentation.html
Requires=zookeeper.service

[Service]
Type=simple
ExecStart=/opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties
ExecStop=/opt/kafka/bin/kafka-server-stop.sh

[Install]
WantedBy=multi-user.target

데몬 reload
sudo systemctl daemon-reload
sudo systemctl start zookeeper
sudo systemctl start kafka
