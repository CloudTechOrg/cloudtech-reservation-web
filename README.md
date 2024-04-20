# WEBサーバの設定
## 概要
EC2インスタンスに対してWEBサーバとして起動させる設定を行います。

## 前提
- EC2インスタンスssh接続などでログインしていること

## 手順

### 1. yumのアップデート
各種インストールを行うために使用するyumパッケージを最新化する
```shell
sudo yum update -y
```

### 2. Gitのインストール
ソースコードをEC2インスタンスにダウンロードするため、gitをインストールする
```shell
sudo yum install -y git
```

### 3. nginxのインストール
Webサーバとして動作させるためのNginxをインストールする
```shell
sudo yum install nginx
```

インストール後、下記コマンドでNginxを起動する
```shell
sudo systemctl start nginx
```

再起動時に起動されるように設定する
```
sudo systemctl enable nginx
```

`http://[web-serber-01のIPアドレス]`をブラウザに入力することで、`Weblome to nginx!`のページが開かれることを確認する

### 4. ソースコードのインストール
gitコマンドで、ソースコードをインストールする
```shell
cd /usr/share/nginx/html/
sudo git clone https://github.com/CloudTechOrg/cloudtech-reservation-web.git
```

### 5. Nginxのデフォルト設定を変更
以下のコマンドでAPIを起動する

/etc/nginx/nginx.conf

/home/ec2-user/cloudtech-reservation-web
/index.html

```
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /home/ec2-user/cloudtech-reservation-web;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
```

sudo systemctl restart nginx

```shell
cd cloudtech-reservation-api
nohup go run main.go &
```


cd cd /usr/share/nginx/html

sudo git clone https://github.com/CloudTechOrg/cloudtech-reservation-web.git

sudo vi /etc/nginx/nginx.conf

sudo systemctl restart nginx

```
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html/cloudtech-reservation-web;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
```

### 6. 再起動時に起動されるように設定

ToDo

## 起動方法
起動したAPIをローカル（同じEC2内）で呼び出したい場合、下記のURLにアクセスする

```
http://localhost:8080
```

外部から呼び出したい場合、以下のURLにアクセスする（セキュリティグループなどのアクセス権限が許可されている前提）

```
http://[IPアドレス]:8080
```

# データベース接続
