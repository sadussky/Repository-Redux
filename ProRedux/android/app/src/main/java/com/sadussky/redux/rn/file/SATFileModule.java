package com.sadussky.redux.rn.file;

import android.support.annotation.Nullable;
import android.util.SparseArray;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.rnfs.Downloader;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by #!Sadu.Stephen on 2017/5/12.ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 *
 * @since v1.1.0
 */
public class SATFileModule extends ReactContextBaseJavaModule {


    private static final String LOG_TAG = "SATFileModule";
    private static final String CONS_KEY_SHORT = "SHORT";
    private float[] mMeasureBuffer = new float[4];
    private final ReactApplicationContext reactContext;
    private SparseArray<FileUploadAsyncTask> downloaders = new SparseArray<FileUploadAsyncTask>();

    public SATFileModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SATFileModule";
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(CONS_KEY_SHORT, Toast.LENGTH_SHORT);
        return constants;
    }


    @ReactMethod
    public void upLoadFile(final ReadableMap options, final Promise promise) {
        try {
            final String filePath = options.getString("filePath");
            final String serverFilePath = options.getString("serverFilePath");
            final int jobId = options.getInt("jobId");
            ReadableMap headers = options.getMap("headers");
            FileUploadAsyncTask.Params params = new FileUploadAsyncTask.Params();
            params.filePath = filePath;
            params.serverFilePath = serverFilePath;
            params.callback = new FileUploadAsyncTask.Callback() {
                public void OnTaskCompleted(FileUploadAsyncTask.Result result) {
                    super.OnTaskCompleted(result);
                    if (result.exception == null) {
                        WritableMap infoMap = Arguments.createMap();
                        infoMap.putInt("jobId", jobId);
                        infoMap.putInt("statu", result.statu);
                        promise.resolve(infoMap);
                    } else {
                        reject(promise, serverFilePath, result.exception);
                    }
                }

                public void OnDownloadBegin(FileUploadAsyncTask.Params params) {
                    super.OnDownloadBegin(params);
                    WritableMap headersMap = Arguments.createMap();
                    WritableMap data = Arguments.createMap();
                    data.putInt("jobId", jobId);
                    sendEvent(getReactApplicationContext(), "DownloadBegin-" + jobId, data);
                }

                public void OnDownloadProgress(Integer progress) {
                    super.OnDownloadProgress(progress);
                    WritableMap data = Arguments.createMap();
                    data.putInt("jobId", jobId);
                    data.putInt("progress", progress);
                    sendEvent(getReactApplicationContext(), "DownloadProgress-" + jobId, data);
                }
            };
            FileUploadAsyncTask downloader = new FileUploadAsyncTask(reactContext);
            downloader.execute(params);
            this.downloaders.put(jobId, downloader);
        } catch (Exception ex) {
            ex.printStackTrace();
            reject(promise, options.getString("toFile"), ex);
        }
    }


    private void reject(Promise promise, String filepath, Exception ex) {
        if (ex instanceof FileNotFoundException) {
            rejectFileNotFound(promise, filepath);
            return;
        }

        promise.reject(null, ex.getMessage());
    }

    private void rejectFileNotFound(Promise promise, String filepath) {
        promise.reject("ENOENT", "ENOENT: no such file or directory, open '" + filepath + "'");
    }

    private void rejectFileIsDirectory(Promise promise) {
        promise.reject("EISDIR", "EISDIR: illegal operation on a directory, read");
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(RCTNativeAppEventEmitter.class)
                .emit(eventName, params);
    }
}
