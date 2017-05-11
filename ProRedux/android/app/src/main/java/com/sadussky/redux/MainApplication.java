package com.sadussky.redux;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.futurice.rctaudiotoolkit.AudioPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativerecordsound.ReactNativeRecordSoundPackager;
import com.rnfs.RNFSPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new MyToastPackage(),
                    new ReactNativeRecordSoundPackager(),
                    new RNFSPackage(),
                    new AudioPackage(),
                    new CodePush(
                            "yklOWf9G5MZCnMBhmA0ZSTz3gJEBRLKS20Wxv",
                            getApplicationContext(),
                            BuildConfig.DEBUG,
                            "http://codepush.19910225.com:8080")
                    //使用CodePush服务器测试
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
