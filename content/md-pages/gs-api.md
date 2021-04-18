---
title: jupyterからgoogle sheetに書き込む
date: 2021-02-24
tags: ['python']
---

 

google sheetをgoogle APIを利用して書き込む。webアプリケーションとして公開し、httpメソッドのpostで書き込む。



#### google sheet API[(link)](https://developers.google.com/sheets/api/quickstart/python#step_3_set_up_the_sample)

### 事前準備 Google Cloudの認証情報を作成する

1. Google Cloud Platform[(link)](https://console.cloud.google.com/)にログイン。

2. プロジェクトを作成

3. Google Sheets APIを有効化

   - API → APIの概要に移動をクリック
   - APIとサービス → APIとサービスの有効化をクリック
   - APIライブラリ → (検索) → Google Sheets APIを有効化

4. 認証情報を作成をクリック

5. プロジェクトへの認証情報の追加

   - 使用するAPI：Google Sheets API
   - APIを呼び出す場所：その他のUI (Windows、CLIツールなど) 
   - アクセスするデータの種類：アプリケーションデータ

6. OAuth同意画面の作成

   - 認証情報の作成 → OAuthクライアントIDを選択 → OAuth同意画面

   - User Type: 外部 → 作成をクリック
   - アプリ名、ユーザーサポートメールを入力
   - アプリのロゴ、アプリケーションのホームページなどは任意
   - デベロッパーの連絡先情報を入力 → 保存して次へ
   - スコープ、テストユーザーの項目は何も入力せず、保存して次へ
   - ダッシュボードへ戻る

7. OAuthクライアントIDの作成

   - 認証情報の作成 → OAuthクライアントIDの作成を選択
   - アプリケーションの種類：デスクトップアプリを選択
   - 作成をクリック

8. OAuth2.0クライアントIDのダウンロードアイコン

   - 認証情報のJSONファイルをダウンロード

#### ライブラリのインストール

oauth2clientは非推奨

```shell
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

#### 認証 

OAuthクライアントIDのjsonをclient_secret.jsonにリネームして置く。

```python
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

API_SERVICE_NAME = "sheets"
API_VERSION = "v4"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
CLIENT_SECRETS_FILE = 'client_secret.json'

def get_authenticated_service():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRETS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    return build(API_SERVICE_NAME, API_VERSION, credentials=creds)

service = get_authenticated_service()
print(service)
-> <googleapiclient.discovery.Resource object at 0x10b091bb0>
```

新規にシートを追加する

```python
spreadsheet_id = '1f2ig-fIMuYAVEScYqdNmNuSmUCWrdeHxNwAONsr0O0I'
sheetname='frogs'

# シートの作成
requests=[]
requests.append({
    'addSheet':{
        "properties":{
            "title": sheetname,
            "index": "0",
            }

        }
    })

body={'requests':requests}
response=service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=body).execute()
```

データを入力する

```python
range_ = sheetname+"!A1:B10"
v={}
v['range']=range_
v['majorDimension']="ROWS"
v['values']=[
        [1,  2],
        [3,  4],
        [4,  5],
        [5,  6],
        [6,  7],
        [7,  8],
        [8,  9],
        [10, 11],
        [12, 13],
        ['test', 'スプレッドシートのテストですよ'],
        ]
value_input_option = 'USER_ENTERED'
insert_data_option='OVERWRITE'
result = service.spreadsheets().values().update( spreadsheetId=spreadsheet_id, range=range_, valueInputOption=value_input_option, body=v).execute()
```

