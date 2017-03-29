
热更新测试环境安装步骤：--------------------

1.安装客户端工具
	npm install react-native-cli@latest -g
    npm install  code-push-cli@latest -g
2.安装react-native-code-push
	npm install --save react-native-code-push
3.连接到项目中，提示输入配置可以先行忽略
	react-native link react-native-code-push
4.浏览器中登录获取token，用户名:admin, 密码:123456
	code-push login http://10.8.75.70:3000
5.创建iOS版, 获取Production DeploymentKey
 	code-push app add CodePushDemo-ios
6.创建android版，获取获取Production DeploymentKey
	code-push app add CodePushDemo-android
7.发布ios版
	code-push release-react CodePushDemo-ios ios -d Production
8.发布android版
	code-push release-react CodePushDemo-android  android -d Production


##获取到 CodePushDemo-android 的 Keys--------------

boffys-MacBook-Pro:CodePushDemo mac$ code-push app add CodePushDemo-android
Successfully added the "CodePushDemo-android" app, along with the following default deployments:
┌────────────┬───────────────────────────────────────┐
│ Name       │ Deployment Key                        │
├────────────┼───────────────────────────────────────┤
│ Production │ peVEhNln02ssTKJFSjds5msYURv34ksvOXqog │
├────────────┼───────────────────────────────────────┤
│ Staging    │ leOaa5kFC7BrBz7qei7hGSDSbsT34ksvOXqog │
└────────────┴───────────────────────────────────────┘


## 使用CodePush 服务器，并使用MicroSoft账号登录获取Token::
## 服务器地址：  http://codepush.19910225.com:8080
## 账号: sadussky@163.com

boffys-MacBook-Pro:CodePushDemo mac$ code-push app add CodePushDemo-android
Successfully added the "CodePushDemo-android" app, along with the following default deployments:
┌────────────┬───────────────────────────────────────┐
│ Name       │ Deployment Key                        │
├────────────┼───────────────────────────────────────┤
│ Production │ yklOWf9G5MZCnMBhmA0ZSTz3gJEBRLKS20Wxv │
├────────────┼───────────────────────────────────────┤
│ Staging    │ 55wTTBxDJT6LuClGbfv0Pz4HkMwwRLKS20Wxv │




CodePush is a service that enables you to deploy mobile app updates directly to your users' devices.

Usage: code-push <command>

命令：
  access-key       View and manage the access keys associated with your account
  app              View and manage your CodePush apps
  collaborator     View and manage app collaborators
  debug            View the CodePush debug logs for a running app
  deployment       View and manage your app deployments
  link             Link an additional authentication provider (e.g. GitHub) to an existing CodePush account
  login            Authenticate with the CodePush server in order to begin managing your apps
  logout           Log out of the current session
  patch            Update the metadata for an existing release
  promote          Promote the latest release from one app deployment to another
  register         Register a new CodePush account
  release          Release an update to an app deployment
  release-cordova  Release a Cordova update to an app deployment
  release-react    Release a React Native update to an app deployment
  rollback         Rollback the latest release for an app deployment
  session          View and manage the current login sessions associated with your account
  whoami           Display the account info for the current login session

选项：
  -v, --version  显示版本号  [布尔]