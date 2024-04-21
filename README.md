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
Nginxのデフォルトで表示されるhtmlページを、さきほどダウンロードしたアプリケーションの内容に変更する。


以下のコマンドでnginxのconfigファイルを起動する

```
sudo vi /etc/nginx/nginx.conf
```

下記のrootに記載されているURLを、変更する

```
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
```

- 変更前：`/usr/share/nginx/html;`
- 変更後：`/usr/share/nginx/html/cloudtech-reservation-web;`

以下のコマンドでnginxを再起動する
```
sudo systemctl restart nginx
```

## APIの設定
WebアプリケーションからAPIを呼び出すための設定を行う。設定はconfig.jsにて定義されているので、それを変更する。

以下のコマンドで、config.jsを開く
```shell
sudo vi /usr/share/nginx/html/cloudtech-reservation-web/config.js
```

`localhost`となっている部分を、APIサーバのパブリックIPアドレスに変更

```
const apiConfig = {
    baseURL: 'http://localhost:8080'
  };
```