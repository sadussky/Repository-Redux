package com.sadussky.redux;

import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by mac on 2017/3/15.
 */

public class MyToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private float[] mMeasureBuffer = new float[4];
    private final ReactApplicationContext reactContext;

    public MyToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyToastModule";
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }


    /**
     * 参数类型
     * 下面的参数类型在@ReactMethod注明的方法中，会被直接映射到它们对应的JavaScript类型。
     * <p>
     * Boolean -> Bool
     * Integer -> Number
     * Double -> Number
     * Float -> Number
     * String -> String
     * Callback -> function
     * ReadableMap -> Object
     * ReadableArray -> Array
     * 参阅ReadableMap和ReadableArray。
     *
     * @return
     */
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }


    //Callback方式
    public String getTime() {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String time = formatDate.format(date);
        return time;
    }

    @ReactMethod
    public void testCallback(
            int tag,
            int ancestorTag,
            Callback successCallback,
            Callback errorCallback) {
        try {
            successCallback.invoke(tag, getTime());
        } catch (Exception e) {
            errorCallback.invoke(e.getStackTrace().toString());
        }
    }

    /**
     * ##---------------
     * 事件方式：RCTDeviceEventEmitter
     */


    //延迟0.1秒获取时间。
    @ReactMethod
    public void getTimeMillis() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                SimpleDateFormat formatDate = new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss");
                Date date = new Date(System.currentTimeMillis());
                String time = formatDate.format(date);

                WritableMap writableMap = new WritableNativeMap();
                writableMap.putString("key", time);
                sendTransMisson(reactContext, "EventName", writableMap);

            }
        }).start();
    }


    /**
     * @param reactContext
     * @param eventName    事件名
     * @param params       传惨
     */
    public void sendTransMisson(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }


    /**
     * 3 ##---------------
     * Promise传递
     */
    @ReactMethod
    public void testPromiseTime(String name, Promise promise) {
        WritableMap writableMap = new WritableNativeMap();
        writableMap.putString("age", "20");
        writableMap.putString("time", getTime());
        promise.resolve(writableMap);
    }


}



