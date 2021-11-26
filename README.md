# クリエイター祭り2021-多数決システム
「Adobe協賛イベントクリエイター祭り2021」というイベントのコンテンツ、クリエイター多数決にて使用する多数決システムを、pixi.jsを使用したフィードバック機能以外の開発を行いました。

## 概要
このアプリでは、ユーザーがリアルタイムで多数決を行うことができます。イベントの形態に合わせ、ユーザー用ページ、Youtubeライブ配信で流すための司会者用ページ、お題の設定や画面遷移操作をする管理者画面を作成しました。

■ ユーザー用ページ
![クリエイター多数決_ユーザー画面](https://user-images.githubusercontent.com/82256596/143524073-74ffbbc4-4ea1-4374-9c42-c3b2847de6f0.gif)

■ 司会者用ページ
![クリエイター多数決_司会者ページの様子](https://user-images.githubusercontent.com/82256596/143524288-d2474008-83ea-42aa-991c-4207c8fd4a8f.gif)

■ 管理者画面
<img width="1440" alt="スクリーンショット 2021-11-09 10 12 14" src="https://user-images.githubusercontent.com/82256596/143524305-eedbadb6-cfe8-494d-a61b-83dd2ad8c1d6.png">
<img width="1440" alt="スクリーンショット 2021-11-09 10 12 31" src="https://user-images.githubusercontent.com/82256596/143524316-209a4ce5-791c-44b4-bf8a-2e005e23f3c8.png">

■クリエイター祭り LP
https://thecreative.jp/bakuhatsu2021/

## 使用技術
- HTML/CSS
- Javascript
- React
- Sass
- PixiJS
- Firebase
  - Realtime Database
  - Firebase Hosting
  - Firebase Authentication

## 主な機能

### ユーザー用画面機能
- フェーズにおいて画面が切り替わる
- お題と選択肢の表示
- 投票機能
- カウントダウン機能
- 投票結果の%表示
- Goodボタン、Badボタンを押すと司会者画面にフィードバックを送信する機能
- Twitterへのシェア機能

### 司会者用画面機能
- ログイン機能
- フェーズにおいて画面が切り替わる
- お題と２つの選択肢の表示
- ジャッジするキャラクターの表示
- カウントダウン機能
- 投票結果の%表示
- QRコードの表示
-  準備中画面のときのみ準備中用画像の表示

### 管理者用画面
- ログイン・ログアウト機能
- 現在のお題の表示
- フェーズ切り替え操作
- お題の追加
- お題一覧表示
- お題削除
- 現在のお題に設定
